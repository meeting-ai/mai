import { URL, IMeetingEntry, IMeetingTimeSlot } from "./base";

export interface IScheduleMeetingRequest extends IMeetingTimeSlot {
  subject: string;
}

export interface IScheduleMeetingResponse extends IMeetingEntry {
  "@odata.context": URL;
}
