import { DateTime, URL } from "./base";
import { IScheduleMeetingResponse } from "./schedule-meeting";

export interface IUpcomingEventsRequest {
  startdatetime: DateTime;
  enddatetime: DateTime;
}

export interface IUpcomingEventsResponse {
  "@odata.context": URL;
  value: IScheduleMeetingResponse[];
}
