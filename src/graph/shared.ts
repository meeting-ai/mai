import { RequestPromiseOptions } from "request-promise";
import {
  IMeetingTimeSlot,
  DateTime,
  IAttendee,
  ILocation,
  BoolString,
  IDateTimeTimeZone
} from "./types/base";

// TODO: Implement currentTimeSlot
export function currentTimeSlot(): IMeetingTimeSlot {
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

export function buildRequest(
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

export function buildQuery(requestOpts: IRequestOptions) {
  const query = Object.keys(requestOpts.query || {})
    .map(k => `${k}=${requestOpts[k]}`)
    .join("&");
  return (query.length > 0 ? "?" : "") + query;
}

export interface IRequestOptions {
  query?: any;
  body?: any;
}

export const defaultLocationConstraint = {
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
