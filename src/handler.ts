import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { process } from "./nlp";
import qs from 'qs';
import crypto from 'crypto';
import { WebClient } from "@slack/web-api";

const SECRET = 'f0db0d951dcc5038ac747a62bbe498b2';
const TOKEN = 'xoxp-586284238368-799435198032-801330237671-c5ac96cc8a68318fede7e0cc92d921ab';
const web = new WebClient(TOKEN);


export const slash: APIGatewayProxyHandler = async (event, _context) => {
  const timestamp = event.headers['X-Slack-Request-Timestamp'];
  const sig_basestring = 'v0:' + timestamp + ':' + event.body;
  const req_signature = 'v0=' + crypto.createHmac("sha256", SECRET).update(sig_basestring).digest("hex");
  const slack_signature = event.headers['X-Slack-Signature'];
  if (req_signature !== slack_signature){
    throw new Error('invalid signature')
  }

  const body = qs.parse(event.body);
  const userMessage = body.text;
  console.log(userMessage);

  await web.chat.postMessage({
    channel: body.channel_id,
    text: 'test'
  })

  await web.views.open({
    trigger_id: body.trigger_id,
    action_id: '123',
    view: {
      "callback_id": '123',
      "type": "modal",
      "title": {
        "type": "plain_text",
        "text": "New meeting setup",
        "emoji": true
      },
      "submit": {
        "type": "plain_text",
        "text": "Submit",
        "emoji": true
      },
      "close": {
        "type": "plain_text",
        "text": "Cancel",
        "emoji": true
      },
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*:wave: Hi <fakelink.toUser.com|@Arnaud>!* Let's set up your meeting:"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":busts_in_silhouette:  *Attendees*\nChoose who should be included in this meeting"
          },
          "accessory": {
            "type": "multi_users_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Select User"
            },
            "initial_users": []
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":spiral_calendar_pad: *Date*\nChoose what day your meeting takes place"
          },
          "accessory": {
            "type": "datepicker",
            "initial_date": "1990-04-28",
            "placeholder": {
              "type": "plain_text",
              "text": "Pick date",
              "emoji": true
            }
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":alarm_clock: *Time*\nChoose what time your meetings starts"
          },
          "accessory": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Pick time",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Choice 1",
                  "emoji": true
                },
                "value": "value-0"
              }
            ]
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":hourglass: *Duration*\nChoose how long your meeting lasts"
          },
          "accessory": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Pick duration",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "My events",
                  "emoji": true
                },
                "value": "value-0"
              }
            ]
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":office: *Location*\nChoose an available conference room"
          },
          "accessory": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Pick location",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "My events",
                  "emoji": true
                },
                "value": "value-0"
              }
            ]
          }
        },
        {
          "type": "divider"
        },
      ]
    }
  }).catch((error) => {
    console.error(JSON.stringify(error, null, 2));
  })

  return {
    statusCode: 200,
    body: '',
  };
};

export const event: APIGatewayProxyHandler = async (event, _context) => {
  console.log('event received');

  const body = qs.parse(event.body);
  const payload = JSON.parse(body.payload);
  console.log(payload.actions[0].selected_users);

  return {
    statusCode: 200,
    body: ''
  };
};

export const ask: APIGatewayProxyHandler = async (event, _context) => {
  const response = await process(event.queryStringParameters["question"]);
  return {
    statusCode: 200,
    body: JSON.stringify({
      response
    })
  };
};
