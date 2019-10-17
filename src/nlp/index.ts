import { NlpManager } from "node-nlp";
import { manager } from "./manager";
import { EN } from "./util/constants";

let nlpLoaded = false;

export async function loadNlp(): NlpManager {
  if (!nlpLoaded) {
    await manager.train();
    nlpLoaded = true;
  }
  return manager;
}

export async function process(phrase: string) {
  const mgr = await loadNlp();
  return await mgr.process(EN, phrase);
}
