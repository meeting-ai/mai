import {
  IAttendee,
  Availability,
  BoolString,
  Confidence,
  Duration,
  ILocation,
  IMeetingTimeSlot,
  URL
} from "./base";

export interface IFindMeetingRequest {
  attendees: IAttendee[];
  timeConstraint: {
    timeslots: IMeetingTimeSlot[];
  };
  locationConstraint: {
    isRequired: BoolString;
    suggestLocation: BoolString;
    locations: ILocation[];
  };
  meetingDuration: Duration;
}

export interface MeetingTimeSuggestion {
  confidence: Confidence;
  order: number;
  organizerAvailability: Availability;
  attendeeAvailability: [];
  locations: ILocation[];
  meetingTimeSlot: IMeetingTimeSlot;
}

export interface IFindMeetingResponse {
  "@odata.context": URL;
  emptySuggestionsReason: string;
  meetingTimeSuggestions: MeetingTimeSuggestion[];
}
