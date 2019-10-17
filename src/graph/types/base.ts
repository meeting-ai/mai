export type Email = string; // thomas.carrio@dynatrace.com
export type URL = string; // "https://graph.microsoft.com/v1.0/$metadata#microsoft.graph.meetingTimeSuggestionsResult"
export type AttendeeType = "Required" | "Optional" | string;
export type DateTime = string; // "2019-10-17T20:36:29.680Z"
export type TimeZone = string; // "Pacific Standard Time"
export type BoolString = "true" | "false";
export type Duration = string; // "PT1H"
export type Confidence = number; // 0 - 100
export type Availability = "free" | string;
export type LocationType = "conferenceRoom" | string;

export interface IUser {
  emailAddress: {
    address: Email;
    name: string;
  };
}

export interface IAttendee extends IUser {
  type: AttendeeType;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  countryOrRegion: string;
  postalCode: string;
}

export interface Coordinates {}

export interface ILocation {
  displayName: string;
  locationEmailAddress: string;
  locationType?: LocationType;
  address: Address;
  coordinates: Coordinates;
}

export interface IMeetingTimeSlot {
  start: IDateTimeTimeZone;
  end: IDateTimeTimeZone;
}

export type UserStatus = "busy" | string;
export type MeetingType = "singleInstance" | string;

export interface IDateTimeTimeZone {
  dateTime: DateTime;
  timeZone: TimeZone;
}

export interface ICategory {}

export type ResponseType = "organizer" | string;
export interface IResponseStatus {
  response: ResponseType;
  time: DateTime;
}

export interface IBody {
  contentType: "text" | string;
  content: string;
}

export interface IMeetingEntry {
  "@odata.etag": string;
  id: string;
  createdDateTime: DateTime;
  lastModifiedDateTime: DateTime;
  changeKey: DateTime;
  categories: ICategory[];
  originalStartTimeZone: TimeZone;
  originalEndTimeZone: TimeZone;
  iCalUId: string;
  reminderMinutesBeforeStart: number;
  isReminderOn: boolean;
  hasAttachments: boolean;
  subject: string;
  bodyPreview: string;
  importance: string;
  sensitivity: string;
  isAllDay: boolean;
  isCancelled: boolean;
  isOrganizer: boolean;
  responseRequested: boolean;
  seriesMasterId: string | null;
  showAs: UserStatus;
  type: MeetingType;
  webLink: URL;
  onlineMeetingUrl: URL | null;
  recurrence: unknown | null;
  responseStatus: IResponseStatus;
  body: IBody;
  start: IDateTimeTimeZone;
  end: IDateTimeTimeZone;
  location: ILocation;
  locations: ILocation[];
  attendees: IAttendee[];
  organizer: IUser;
}
