import { Client } from "@microsoft/microsoft-graph-client";
import { MaiGraphAuth } from "./auth";
import {
  buildQuery,
  currentTimeSlot,
  IUser,
  IUpcomingEventsOptions,
  IFindMeetingOptions,
  defaultLocationConstraint,
  IScheduleMeetingOptions
} from "./shared";
import {
  BoolString,
  DateTime,
  IAttendee,
  IDateTimeTimeZone,
  ILocation,
  IMeetingTimeSlot
} from "./types/base";
import {
  IFindMeetingRequest,
  IFindMeetingResponse
} from "./types/find-meeting";
import {
  IScheduleMeetingRequest,
  IScheduleMeetingResponse
} from "./types/schedule-meeting";
import {
  IUpcomingEventsRequest,
  IUpcomingEventsResponse
} from "./types/upcoming-events";

export class GraphClientService {
  private readonly me = "v1.0/me/";

  public constructor() {}

  public async upcomingEvents(
    user: IUser,
    options: IUpcomingEventsOptions
  ): Promise<IUpcomingEventsResponse> {
    const endpoint = `${this.me}/calendarview`;
    const query: IUpcomingEventsRequest = {
      startdatetime: options.start,
      enddatetime: options.end
    };

    return client(user)
      .api(endpoint + buildQuery({ query }))
      .get();
  }

  public async findMeeting(
    user: IUser,
    options: IFindMeetingOptions
  ): Promise<IFindMeetingResponse> {
    const endpoint = `${this.me}/findMeetingTimes`;
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
    return client(user)
      .api(endpoint)
      .post(body);
  }

  public async scheduleMeeting(
    user: IUser,
    options: IScheduleMeetingOptions
  ): Promise<IScheduleMeetingResponse> {
    const endpoint = `${this.me}/events`;
    const body: IScheduleMeetingRequest = options;

    return client(user)
      .api(endpoint)
      .post(body);
  }
}

function client(user: IUser): Client {
  return Client.initWithMiddleware({
    baseUrl: this.host,
    authProvider: new MaiGraphAuth(user.token)
  });
}
