import {
  AccessoriesColor,
  BackgroundColor,
  ClothesColor,
  EyesColor,
  HairColor,
  MouthColor,
  SkinColor,
} from '../types/avatar-colors.js';
import { BackgroundExtra, EyesExtra, HairExtra } from '../types/avatar-extras.js';
import {
  AccessoriesType,
  BackgroundType,
  ClothesType,
  EyebrowsType,
  EyesType,
  FaceType,
  FacialHairType,
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
    face: {
      type: getRandomEnumValue(FaceType),
      color: getRandomEnumValue(SkinColor),
    },
    ...(getRandomNumber(1) && {
      hair: {
        type: getRandomEnumValue(HairType),
        color: getRandomEnumValue(HairColor),
        extra: getRandomEnumValue(HairExtra, true),
      },
    }),
    eyes: {
      type: getRandomEnumValue(EyesType),
      color: getRandomEnumValue(EyesColor),
      extra: getRandomEnumValue(EyesExtra, true),
    },
    eyebrows: {
      type: getRandomEnumValue(EyebrowsType),
      color: getRandomEnumValue(HairColor),
    },
    mouth: {
      type: getRandomEnumValue(MouthType),
      color: getRandomEnumValue(MouthColor),
    },
    ...(getRandomNumber(1) && {
      facialHair: {
        type: getRandomEnumValue(FacialHairType),
        color: getRandomEnumValue(HairColor),
      },
    }),
    clothes: {
      type: getRandomEnumValue(ClothesType),
      color: getRandomEnumValue(ClothesColor),
    },
    ...(getRandomNumber(1) && {
      accessories: {
        type: getRandomEnumValue(AccessoriesType),
        color: getRandomEnumValue(AccessoriesColor),
      },
    }),
    background: {
      type: getRandomEnumValue(BackgroundType),
      color: getRandomEnumValue(BackgroundColor),
      extra: getRandomEnumValue(BackgroundExtra, true),
    },
  };
};
