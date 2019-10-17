import {} from "../entities/rooms";

const bookingId = "booking.prompt";
// const _oldPhrases: string[] = [
//   "in smalls this afternoon",
//   "in smalls at 2",
//   "in smalls at 2 pm",
//   "in the Majestic tomorrow morning",
//   "in smalls"
// ];
const bookingPhrases: string[] = [
  `in %room%`,
  `in %room% at %datetime%`,
  `in %room% around %datetime%`,
  `at %datetime% in %room%`,
  `around %datetime% in %room%`
];

export const bookingPrompt: IPhraseDefinition = {
  id: bookingId,
  phrases: bookingPhrases
};

export interface IPhraseDefinition {
  id: string;
  phrases: string[];
}
