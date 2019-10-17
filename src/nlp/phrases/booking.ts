const bookingId = "booking.prompt";
const bookingPhrases: string[] = [
  "in smalls this afternoon",
  "in smalls at 2",
  "in smalls at 2 pm",
  "in the Majestic tomorrow morning",
  "in smalls"
];

export const bookingPrompt: IPhraseDefinition = {
  id: bookingId,
  phrases: bookingPhrases
};

export interface IPhraseDefinition {
  id: string;
  phrases: string[];
}
