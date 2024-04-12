import {
  AccessoriesColor,
  BackgroundColor,
  ClothesColor,
  EyesColor,
  HairColor,
  MouthColor,
  SkinColor,
} from '../types/avatar-colors.js';
import {
  AccessoriesType,
  BackgroundType,
  ClothesType,
  EyebrowsType,
  EyesAccessoriesType,
  EyesType,
  FaceType,
  FacialHairType,
  HairAccessoriesType,
  HairType,
  MouthType,
} from '../types/avatar-types.js';
import { Avatar } from '../types/avatar.js';

export const getRandomNumber = (max: number, min = 0): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomEnumValue = <T>(enumType: T, optional?: boolean): T[keyof T] => {
  const enumValues = Object.values(enumType as Record<string, T[keyof T]>);

  const maxValue = optional ? enumValues.length : enumValues.length - 1;

  const randomIndex = getRandomNumber(maxValue);

  return enumValues[randomIndex];
};

export const createRandomAvatar = (): Avatar => {
  return {
    face: createRandomAvatarPart(FaceType, SkinColor),
    hair: createRandomAvatarPart(HairType, HairColor, true),
    hair_accessories: createRandomAvatarPart(HairAccessoriesType, ClothesColor, true),
    eyes: createRandomAvatarPart(EyesType, EyesColor),
    eyes_accessories: createRandomAvatarPart(EyesAccessoriesType, AccessoriesColor, true),
    eyebrows: createRandomAvatarPart(EyebrowsType, HairColor),
    mouth: createRandomAvatarPart(MouthType, MouthColor),
    facialHair: createRandomAvatarPart(FacialHairType, HairColor, true),
    clothes: createRandomAvatarPart(ClothesType, ClothesColor),
    accessories: createRandomAvatarPart(AccessoriesType, AccessoriesColor, true),
    background: createRandomAvatarPart(BackgroundType, BackgroundColor),
  } as Avatar;
};

export const createRandomAvatarPart = (
  types: { [key: string]: string },
  colors: { [key: string]: string },
  optional?: boolean
) => {
  if (optional && !getRandomNumber(1)) {
    return;
  }

  return {
    type: getRandomEnumValue(types),
    color: getRandomEnumValue(colors),
  };
};
