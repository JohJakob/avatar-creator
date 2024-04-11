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
import { Avatar, DEFAULT_AVATAR } from '../types/avatar.js';
import { isEnumValue } from './is-enum-value.js';
import { createRandomAvatar } from './random.js';

export const getValidAvatar = (avatar: Avatar, random?: boolean): Avatar => {
  const defaultAvatar = random ? createRandomAvatar() : DEFAULT_AVATAR;

  if (!avatar) {
    return defaultAvatar;
  }

  return {
    face: {
      type: isEnumValue(FaceType, avatar.face?.type) ? avatar.face?.type : defaultAvatar.face.type,
      color: isEnumValue(SkinColor, avatar.face?.color) ? avatar.face?.color : defaultAvatar.face.color,
    },

    ...((avatar.hair || random) && {
      hair: {
        type:
          avatar.hair && isEnumValue(HairType, avatar.hair?.type)
            ? avatar.hair.type
            : defaultAvatar.hair?.type ?? HairType.Hair1,
        color:
          avatar.hair && isEnumValue(HairColor, avatar.hair.color)
            ? avatar.hair?.color
            : defaultAvatar.hair?.color ?? HairColor.Blond,
        extra:
          avatar.hair?.extra && isEnumValue(HairExtra, avatar.hair.extra)
            ? avatar.hair?.extra
            : defaultAvatar.hair?.extra,
      },
    }),

    eyes: {
      type: isEnumValue(EyesType, avatar.eyes?.type) ? avatar.eyes.type : defaultAvatar.eyes?.type,
      color: isEnumValue(EyesColor, avatar.eyes?.color) ? avatar.eyes.color : defaultAvatar.eyes?.color,
      extra:
        avatar.eyes?.extra && isEnumValue(EyesExtra, avatar.eyes.extra) ? avatar.eyes.extra : defaultAvatar.eyes?.extra,
    },

    eyebrows: {
      type: isEnumValue(EyebrowsType, avatar.eyebrows?.type) ? avatar.eyebrows.type : defaultAvatar.eyebrows?.type,
      color: isEnumValue(HairColor, avatar.eyebrows?.color) ? avatar.eyebrows.color : defaultAvatar.eyebrows?.color,
    },

    mouth: {
      type: isEnumValue(MouthType, avatar.mouth?.type) ? avatar.mouth.type : defaultAvatar.mouth?.type,
      color: isEnumValue(MouthColor, avatar.mouth?.color) ? avatar.mouth.color : defaultAvatar.mouth?.color,
    },

    ...(avatar.facialHair && {
      facialHair: {
        type: isEnumValue(FacialHairType, avatar.facialHair.type)
          ? avatar.facialHair.type
          : defaultAvatar.facialHair?.type ?? FacialHairType.Beard,
        color: isEnumValue(HairColor, avatar.facialHair.color)
          ? avatar.facialHair.color
          : defaultAvatar.facialHair?.color ?? HairColor.Blond,
      },
    }),

    clothes: {
      type: isEnumValue(ClothesType, avatar.clothes?.type) ? avatar.clothes.type : defaultAvatar.clothes?.type,
      color: isEnumValue(ClothesColor, avatar.clothes?.color) ? avatar.clothes.color : defaultAvatar.clothes?.color,
    },

    ...(avatar.accessories && {
      accessories: {
        type: isEnumValue(AccessoriesType, avatar.accessories.type)
          ? avatar.accessories.type
          : defaultAvatar.accessories?.type ?? AccessoriesType.Beads,
        color: isEnumValue(AccessoriesColor, avatar.accessories.color)
          ? avatar.accessories.color
          : defaultAvatar.accessories?.color ?? AccessoriesColor.Gold,
      },
    }),

    background: {
      type: isEnumValue(BackgroundType, avatar.background?.type)
        ? avatar.background.type
        : defaultAvatar.background?.type,
      color: isEnumValue(BackgroundColor, avatar.background?.color)
        ? avatar.background.color
        : defaultAvatar.background?.color,
      extra:
        avatar.background?.extra && isEnumValue(BackgroundExtra, avatar.background.extra)
          ? avatar.background.extra
          : defaultAvatar.background?.extra,
    },
  };
};
