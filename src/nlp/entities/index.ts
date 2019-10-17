import { NerManager, NlpManager } from "node-nlp";
import { rooms } from "./rooms";

function loadEntities(manager: NlpManager) {
  rooms.forEach(room => manager.addNamedEntityText(...room));
}

const entityManager = new NerManager({ threshold: 0.8 });

export { entityManager, loadEntities };
