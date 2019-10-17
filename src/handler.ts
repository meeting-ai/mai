import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { process } from "./nlp";
// import { WebClient } from "@slack/web-api";

export const slash: APIGatewayProxyHandler = async (event, _context) => {
  console.log(JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(
      {
        "text": "It's 80 degrees right now.",
        "attachments": [
          {
            "text": "Partly cloudy today and tomorrow"
          }
        ]
      },
      null,
      2
    )
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
