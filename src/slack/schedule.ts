const durations: Duration[] = [5, 10, 15, 20, 30, 45, 60, 90, 120, 180];

function buildGreeting(user: IUser) {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `*:wave: Hi <${user.id}|${user.name}>!* Let's set up your meeting:`
    }
  };
}

function divider() {
  return {
    type: "divider"
  };
}

function buildAttendees(included: IUser[]) {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text:
        ":busts_in_silhouette:  *Attendees*\nChoose who should be included in this meeting"
    },
    accessory: {
      type: "multi_users_select",
      placeholder: {
        type: "plain_text",
        text: "Select User"
      },
      initial_users: [included.map(u => u.id)]
    }
  };
}

function buildDate(date: IDate) {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text:
        ":spiral_calendar_pad: *Date*\nChoose what day your meeting takes place"
    },
    accessory: {
      type: "datepicker",
      initial_date: `${date.year}-${date.month}-${date.day}` || "1990-04-28",
      placeholder: {
        type: "plain_text",
        text: "Pick date",
        emoji: true
      }
    }
  };
}

function buildTime(times: ITime[]) {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: ":alarm_clock: *Time*\nChoose what time your meetings starts"
    },
    accessory: {
      type: "static_select",
      placeholder: {
        type: "plain_text",
        text: "Pick time",
        emoji: false
      },
      options: times.map((t, i) => {
        const time = `${t.hour}:${t.minute}:${t.second}`;
        return {
          text: {
            type: "plain_text",
            text: time,
            emoji: false
          },
          value: time
        };
      })
    }
  };
}

function buildDuration(selected?: Duration) {
  const unmapped = durations.filter(d => d !== selected);

  if (selected !== undefined) {
    unmapped.unshift(selected!);
  }

  const options = unmapped.map((d, i) => ({
    text: {
      type: "plain_text",
      text: `${d}`,
      emoji: true
    },
    value: `${d}`
  }));

  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: ":hourglass: *Duration*\nChoose how long your meeting lasts"
    },
    accessory: {
      type: "static_select",
      placeholder: {
        type: "plain_text",
        text: "Pick duration",
        emoji: true
      },
      options
    }
  };
}

function buildRoom(rooms: IRoom[]) {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: ":office: *Location*\nChoose an available conference room"
    },
    accessory: {
      type: "static_select",
      placeholder: {
        type: "plain_text",
        text: "Pick location",
        emoji: true
      },
      options: rooms.map(r => ({
        text: {
          type: "plain_text",
          text: r.name,
          emoji: true
        },
        value: r.id
      }))
    }
  };
}

function buildNote(note?: INote) {
  return {
    type: "input",
    element: {
      type: "plain_text_input"
    },
    label: {
      type: "plain_text",
      text: ":pencil: Add a note",
      emoji: true
    }
  };
}
export function buildSchedule(x: IUserMeetingInfo) {
  return [
    buildGreeting(x.user),
    divider(),
    buildAttendees(x.attendees),
    buildDate(x.date),
    buildTime(x.times),
    buildDuration(x.duration),
    buildRoom(x.rooms),
    divider(),
    buildNote(x.note)
  ];
}

export interface IUserMeetingInfo {
  user: IUser;
  attendees: IUser[];
  date: IDate;
  times: ITime[];
  duration: Duration;
  rooms: IRoom[];
  note?: INote;
}

interface IUser {
  id: string;
  name: string;
}

interface IDate {
  year: number;
  month: number;
  day: number;
}

interface ITime {
  hour: number;
  minute: number;
  second: number;
}

interface IRoom {
  id: string;
  name: string;
}

interface INote {
  user: string;
  content: string;
}

type Duration = 5 | 10 | 15 | 20 | 30 | 45 | 60 | 90 | 120 | 180;
