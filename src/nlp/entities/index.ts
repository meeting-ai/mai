import { NerManager } from "node-nlp";
import { rooms } from "./rooms";

const entityManager = new NerManager({ threshold: 0.8 });
rooms.forEach(room => entityManager.addNamedEntityText(...room));

export { entityManager };
