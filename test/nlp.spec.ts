import { process } from "../src/nlp";

function buildFilter(id: string) {
  return response => response.classifications.filter(c => c.label === id);
}

const booking = buildFilter("booking.prompt");

async function testBooking(phrase: string, match: boolean = true) {
  const expectedMatches = match ? 1 : 0;
  const response = await process(phrase);
  const matches = booking(response);
  if (matches.length !== expectedMatches) {
    console.log(response);
  }
  if (matches.length === 1) {
    if (expectedMatches === 1) {
      expect(matches[0].value).toBeGreaterThan(0.5);
    } else {
      expect(matches[0].value).toBeLessThan(0.5);
    }
  } else {
    expect(matches.length).toEqual(expectedMatches);
  }
}

describe("NLP", () => {
  test("Exact match", async () => {
    await testBooking("in smalls at 2 pm");
  });

  test("Different datetime", async () => {
    await testBooking("in smalls at 7 am");
  });

  test("Exact room, no datetime", async () => {
    await testBooking("in smalls");
  });

  test("Different room, no datetime", async () => {
    await testBooking("in the Majestic");
  });

  test("Full room name, with datetime", async () => {
    await testBooking("this afternoon in the 212 room");
  });

  test("Non-matching unrelated phrase", async () => {
    await testBooking("this guy wants to set something up", false);
  });
});
