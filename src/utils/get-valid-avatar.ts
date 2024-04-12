import {
  AccessoriesColor,
  AvatarColor,
  BackgroundColor,
  ClothesColor,
  EyesColor,
  HairColor,
  MouthColor,
  SkinColor,
} from '../types/avatar-colors.js';
import {
  AccessoriesType,
  AvatarType,
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
  NoseType,
} from '../types/avatar-types.js';
import { Avatar, DEFAULT_AVATAR } from '../types/avatar.js';
import { getDefaultEnumValue, isEnumValue } from './enum.js';
import { createRandomAvatar } from './random.js';

export const getValidAvatar = (avatar: Avatar, random?: boolean): Avatar => {
  const defaultAvatar = random ? createRandomAvatar() : DEFAULT_AVATAR;

  if (!avatar) {
    return defaultAvatar;
  }

  return {
    face: getValidAvatarPart(avatar, defaultAvatar, 'face', FaceType, SkinColor),
    hair: getValidAvatarPart(avatar, defaultAvatar, 'hair', HairType, HairColor, true),
    hair_accessories: getValidAvatarPart(avatar, defaultAvatar, 'hair_accessories', HairAccessoriesType, ClothesColor),
    eyes: getValidAvatarPart(avatar, defaultAvatar, 'eyes', EyesType, EyesColor),
    eyes_accessories: getValidAvatarPart(
      avatar,
      defaultAvatar,
      'eyes_accessories',
      EyesAccessoriesType,
      AccessoriesColor,
      true
    ),
    eyebrows: getValidAvatarPart(avatar, defaultAvatar, 'eyebrows', EyebrowsType, HairColor),
    nose: getValidAvatarPart(avatar, defaultAvatar, 'nose', NoseType, null, false, true),
    mouth: getValidAvatarPart(avatar, defaultAvatar, 'mouth', MouthType, MouthColor),
    facialHair: getValidAvatarPart(avatar, defaultAvatar, 'facialHair', FacialHairType, MouthColor, true),
    clothes: getValidAvatarPart(avatar, defaultAvatar, 'clothes', ClothesType, ClothesColor),
    accessories: getValidAvatarPart(avatar, defaultAvatar, 'accessories', AccessoriesType, AccessoriesColor, true),
    background: getValidAvatarPart(avatar, defaultAvatar, 'background', BackgroundType, BackgroundColor),
  } as Avatar;
};

const getValidAvatarPart = (
  avatar: Avatar,
  defaultAvatar: Avatar,
  partName: keyof Avatar,
  types: { [key: string]: string },
  colors?: { [key: string]: string },
  optional?: boolean,
  noColor?: boolean
): { type: keyof typeof types; color: keyof typeof colors } => {
  if (!avatar[partName]) {
    // TODO: restore later
    // if (optional) {
    //   return;
    // }

    return defaultAvatar[partName];
  }

  const defaultType = defaultAvatar[partName]?.type ?? getDefaultEnumValue(types);
  const defaultColor = noColor ? defaultAvatar[partName]?.color ?? getDefaultEnumValue(colors) : null;

  return {
    type: isEnumValue(types, avatar[partName]?.type) ? avatar[partName].type : defaultType,
    ...(!noColor && { color: isEnumValue(colors, avatar[partName]?.color) ? avatar[partName].color : defaultColor }),
  };
};
