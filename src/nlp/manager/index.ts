import { loadEntities } from "../entities";
import { loadPhrases } from "../phrases";
import { NlpManager } from "node-nlp";
import { EN } from "../util/constants";

const manager = new NlpManager({ languages: [EN] });
loadEntities(manager);
loadPhrases(manager);

export { manager };
