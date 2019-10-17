import rp, { RequestPromiseOptions } from "request-promise";
import {
  IFindMeetingRequest,
  IFindMeetingResponse
} from "./types/find-meeting";
import {
  IScheduleMeetingRequest,
  IScheduleMeetingResponse
} from "./types/schedule-meeting";
import {
  IDateTimeTimeZone,
  IAttendee,
  ILocation,
  IMeetingTimeSlot,
  BoolString,
  DateTime
} from "./types/base";
import {
  IUpcomingEventsResponse,
  IUpcomingEventsRequest
} from "./types/upcoming-events";

export class GraphHttpService {
  private readonly host = "https://graph.microsoft.com";
  private readonly me = "v1.0/me/";

  public constructor() {}

  public async upcomingEvents(
    user: IUser,
    options: IUpcomingEventsOptions
  ): Promise<IUpcomingEventsResponse> {
    const host = user.host || this.host;
    const endpoint = `${host}/${this.me}/calendarview`;
    const query: IUpcomingEventsRequest = {
      startdatetime: options.start,
      enddatetime: options.end
    };
    const { url, ro } = buildRequest(user, endpoint, { query });
    const response = await rp.get(url, ro);
    return response;
  }

  public async findMeeting(
    user: IUser,
    options: IFindMeetingOptions
  ): Promise<IFindMeetingResponse> {
    const host = user.host || this.host;
    const endpoint = `${host}/${this.me}/findMeetingTimes`;
    const body: IFindMeetingRequest = {
      attendees: options.attendees || [],
      locationConstraint: {
        ...defaultLocationConstraint,
        ...options.locationConstraint,
        locations: options.locations || []
      },
      meetingDuration: options.duration || "PT1H",
      timeConstraint: {
        timeslots: options.timeSlots || [currentTimeSlot()]
      }
    };

    const { url, ro } = buildRequest(user, endpoint, { body });

    const response: IFindMeetingResponse = await rp.post(url, ro);

    return response;
  }

  public async scheduleMeeting(
    user: IUser,
    options: IScheduleMeetingOptions
  ): Promise<IScheduleMeetingResponse> {
    const host = user.host || this.host;
    const endpoint = `${host}/${this.me}/events`;
    const body: IScheduleMeetingRequest = options;

    const { url, ro } = buildRequest(user, endpoint, { body });

    const response: IScheduleMeetingResponse = await rp.post(url, ro);

    return response;
  }
}

// TODO: Implement currentTimeSlot
function currentTimeSlot(): IMeetingTimeSlot {
  return {
    start: {
      dateTime: "",
      timeZone: ""
    },
    end: {
      dateTime: "",
      timeZone: ""
    }
  };
}

function buildRequest(
  user: IUser,
  endpoint: string,
  requestOpts: IRequestOptions
): { url: string; ro: RequestPromiseOptions } {
  return {
    url: endpoint + buildQuery(requestOpts),
    ro: {
      auth: { bearer: user.token },
      body: requestOpts.body
    }
  };
}

function buildQuery(requestOpts: IRequestOptions) {
  const query = Object.keys(requestOpts.query || {})
    .map(k => `${k}=${requestOpts[k]}`)
    .join("&");
  return (query.length > 0 ? "?" : "") + query;
}

interface IRequestOptions {
  query?: any;
  body?: any;
}

const defaultLocationConstraint = {
  suggestLocation: "true",
  isRequired: "false"
};

export interface IUpcomingEventsOptions {
  start: DateTime;
  end: DateTime;
}

export interface IFindMeetingOptions {
  attendees?: IAttendee[];
  locations?: ILocation[];
  locationConstraint?: {
    suggestLocation: BoolString;
    isRequired: BoolString;
  };
  duration?: string;
  timeSlots?: IMeetingTimeSlot[];
}

export interface IScheduleMeetingOptions {
  subject: string;
  start: IDateTimeTimeZone | any;
  end: IDateTimeTimeZone | any;
}

export interface IUser {
  token: string;
  host?: string;
}
