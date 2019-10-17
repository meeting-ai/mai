import { NlpManager } from "node-nlp";
import { EN } from "../util/constants";
import { bookingPrompt } from "./booking";

const phraseManager = new NlpManager({ languages: [EN] });

function loadPhrases(manager: NlpManager) {
  bookingPrompt.phrases.forEach(phrase => {
    manager.addDocument(EN, phrase, bookingPrompt.id);
  });
}

export { phraseManager, loadPhrases };
