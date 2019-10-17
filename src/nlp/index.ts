import { phraseManager } from "./phrases";
// import { entityManager } from "./entities";
import { EN } from "./util/constants";

export async function process(phrase: string) {
  return await phraseManager.process(EN, phrase);
}
