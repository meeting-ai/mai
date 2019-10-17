type EN = "en";
type Locale = EN;

type English = "English";
type Language = English;

type DefaultDomain = "default";
type Domain = DefaultDomain;

interface IClassification {
  label: string;
  value: number;
}

type NonNegative = number; // >= 0

interface IEntity {
  start: NonNegative;
  end: NonNegative;
  len: NonNegative;
  accuracy: number;
  option: string;
  sourceText: string;
  entity: string;
  utteranceText: string;
}

interface ITrainedEntity extends IEntity {
  levenshtein: number;
}

interface IUnitEntity extends IEntity {
  resolution: {
    strValue: string;
    value: number;
    unit: string;
    localeUnit: string;
  };
}

interface ITimeEntity extends IEntity {
  entity: TimeType;
  values: ITimeValue[];
}

interface ITimeValue {
  timex: TimexString;
  type: TimeType;
  value: TimeString;
}

type NumberType = "number";
type DimensionType = "dimension";
type TimeType = "time";
type DatetimeV2Type = "datetimeV2.time";
type EntityType =
  | NumberType
  | DimensionType
  | TimeType
  | DatetimeV2Type
  | string;

interface ISourceEntity {
  start: NonNegative;
  end: NonNegative;
  resolution: ISourceResolution;
  text: string;
  typeName: EntityType;
}

type Unit = string; // Picometer
type SourceUnit = string; // Picometer

interface ISourceUnitResolution {
  value: string;
  unit: Unit;
  srcUnit: SourceUnit;
}

interface ISourceResolution {
  value: string;
}

interface ISourceResolutions {
  values: ISourceResolution[];
}

interface ISourceDatetime {
  start: NonNegative;
  end: NonNegative;
  resolution: {
    values: ISourceDatetimeResolution[];
  };
  text: string;
  typeName: DatetimeV2Type;
}

type TimeString = string; // HH:MM:SS
type TimexString = string; // THH
interface ISourceDatetimeResolution {
  timex: TimexString;
  type: TimeType;
  value: TimeString;
}

interface ISentiment {
  score: number;
  comparative: number;
  vote: string;
  numWords: number;
  numHits: number;
  type: string;
  language: Locale;
}

interface IProcessed {
  response: {
    utterance: string;
    locale: Locale;
    languageGuessed: false;
    localeIso2: Locale;
    language: Language;
    domain: Domain;
    classifications: IClassification[];
    intent: string;
    score: number;
    entities: IEntity[];
    sourceEntities: ISourceEntity[];
    sentiment: ISentiment;
    actions: unknown[];
  };
}
