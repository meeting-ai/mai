import { NlpManager } from "node-nlp";
import { EN } from "../util/constants";
import { bookingPrompt } from "./booking";

const phraseManager = new NlpManager({ languages: [EN] });
bookingPrompt.phrases.forEach(phrase => {
  phraseManager.addDocument(EN, phrase, bookingPrompt.id);
});

export { phraseManager };
