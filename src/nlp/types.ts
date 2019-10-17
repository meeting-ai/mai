export type EN = "en";
export type Locale = EN;

export type English = "English";
export type Language = English;

export type DefaultDomain = "default";
export type Domain = DefaultDomain;

export interface IClassification {
  label: string;
  value: number;
}

export type NonNegative = number; // >= 0

export interface IEntity {
  start: NonNegative;
  end: NonNegative;
  len: NonNegative;
  accuracy: number;
  option: string;
  sourceText: string;
  entity: string;
  utteranceText: string;
}

export interface ITrainedEntity extends IEntity {
  levenshtein: number;
}

export interface IUnitEntity extends IEntity {
  resolution: {
    strValue: string;
    value: number;
    unit: string;
    localeUnit: string;
  };
}

export interface ITimeEntity extends IEntity {
  entity: TimeType;
  values: ITimeValue[];
}

export interface ITimeValue {
  timex: TimexString;
  type: TimeType;
  value: TimeString;
}

export type NumberType = "number";
export type DimensionType = "dimension";
export type TimeType = "time";
export type DatetimeV2Type = "datetimeV2.time";
export type EntityType =
  | NumberType
  | DimensionType
  | TimeType
  | DatetimeV2Type
  | string;

export interface ISourceEntity {
  start: NonNegative;
  end: NonNegative;
  resolution: ISourceResolution;
  text: string;
  typeName: EntityType;
}

export type Unit = string; // Picometer
export type SourceUnit = string; // Picometer

export interface ISourceUnitResolution {
  value: string;
  unit: Unit;
  srcUnit: SourceUnit;
}

export interface ISourceResolution {
  value: string;
}

export interface ISourceResolutions {
  values: ISourceResolution[];
}

export interface ISourceDatetime {
  start: NonNegative;
  end: NonNegative;
  resolution: {
    values: ISourceDatetimeResolution[];
  };
  text: string;
  typeName: DatetimeV2Type;
}

export type TimeString = string; // HH:MM:SS
export type TimexString = string; // THH
export interface ISourceDatetimeResolution {
  timex: TimexString;
  type: TimeType;
  value: TimeString;
}

export interface ISentiment {
  score: number;
  comparative: number;
  vote: string;
  numWords: number;
  numHits: number;
  type: string;
  language: Locale;
}

export interface IProcessed {
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
