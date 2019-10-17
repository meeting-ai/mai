import { EN } from "../util/constants";

const roomId = "room";
const roomDefinitions: IEntityDefinition[] = [
  {
    id: "Room_Smalls",
    synonyms: [
      "Smalls",
      "the Smalls room",
      "the Smalls",
      "smalls",
      "the smalls room",
      "the smalls"
    ]
  },
  {
    id: "Room_Majestic",
    synonyms: [
      "Majestic",
      "the Majestic",
      "the Majestic room",
      "majestic",
      "the majestic",
      "the majestic room"
    ]
  },
  {
    id: "Room_Fox",
    synonyms: [
      "fox",
      "the fox",
      "the fox room",
      "Fox",
      "the Fox",
      "the Fox room"
    ]
  },
  {
    id: "Room_Shelter",
    synonyms: [
      "Shelter",
      "the Shelter",
      "the Shelter room",
      "shelter",
      "the shelter",
      "the shelter room"
    ]
  },
  {
    id: "Room_Joe",
    synonyms: [
      "joe",
      "the joe",
      "the joe room",
      "Joe",
      "the Joe",
      "the Joe room"
    ]
  },
  {
    id: "Room_Roller_Rink",
    synonyms: [
      "Roller rink",
      "the Roller Rink",
      "the Roller Rink room",
      "roller rink",
      "the roller rink",
      "the roller rink room"
    ]
  },
  {
    id: "Room_Outer_Rink",
    synonyms: [
      "Outer Rink",
      "the Outer Rink",
      "the Outer Rink room",
      "outer rink",
      "the outer rink",
      "the outer rink room"
    ]
  },
  {
    id: "Room_Gem",
    synonyms: [
      "Gem",
      "the Gem",
      "the Gem room",
      "gem",
      "the gem",
      "the gem room"
    ]
  }
];

function defToEntity(id: string): (IEntityDefinition) => EntityArguments {
  return (room: IEntityDefinition) => [id, room.id, [EN], room.synonyms];
}

export const rooms = roomDefinitions.map(defToEntity(roomId));

export interface IEntityDefinition {
  id: string;
  synonyms: string[];
}

export type EntityArguments = [string, string, string[], string[]];
