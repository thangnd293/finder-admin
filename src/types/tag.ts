export interface Tag {
  _id: string;
  name: string;
  parentType: string;
  type: TagType;
  description: string;
}

export enum TagType {
  EDUCATION = "Education",
  PETS = "Pets",
  DIETARY_PREFERENCE = "Dietary Preference",
  PERSONALITY_TYPE = "Personality Type",
  ZODIAC = "Zodiac",
  SMOKE_QUESTION = "Smoke question",
  LOVE_QUESTION = "Love question",
  DO_EXERCISE = "Do exercise",
  DRINK = "Drink",
  KIDS = "Kids",
  RELIGION = "Religion",
}
