import { process } from "../src/nlp";

describe("NLP", () => {
  test("Exact match", async () => {
    const response = await process("in smalls at 2 pm");
    console.log(response);
    const matches = response.classifications.filter(
      c => c.label === "booking.prompt"
    );
    expect(matches.length).toEqual(1);
  });

  test("Different datetime", async () => {
    const response = await process("in smalls at 7 am");
    console.log(response);
    const matches = response.classifications.filter(
      c => c.label === "booking.prompt"
    );
    expect(matches.length).toEqual(1);
  });

  test("Exact room, no datetime", async () => {
    const response = await process("in smalls");
    console.log(response);
    const matches = response.classifications.filter(
      c => c.label === "booking.prompt"
    );
    expect(matches.length).toEqual(1);
  });

  test("Different room, no datetime", async () => {
    const response = await process("in the Majestic");
    console.log(response);
    const matches = response.classifications.filter(
      c => c.label === "booking.prompt"
    );
    expect(matches.length).toEqual(1);
  });
});
