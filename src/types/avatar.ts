import {
  AccessoriesColor,
  AvatarColor,
  BackgroundColor,
  ClothesColor,
  EyesColor,
  HairColor,
  MouthColor,
  SkinColor,
} from './avatar-colors.js';
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
} from './avatar-types.js';

export interface AvatarPart {
  type: AvatarType;
  color: AvatarColor;
}

export interface Avatar {
  face: {
    type: FaceType;
    color: SkinColor;
  };
  hair?: {
    type: HairType;
    color: HairColor;
  };
  hair_accessories?: {
    type: HairAccessoriesType;
    color: ClothesColor;
  };
  eyes: {
    type: EyesType;
    color: EyesColor;
  };
  eyes_accessories?: {
    type: EyesAccessoriesType;
    color: AccessoriesColor;
  };
  eyebrows: {
    type: EyebrowsType;
    color: HairColor;
  };
  nose: {
    type: NoseType;
  };
  mouth: {
    type: MouthType;
    color: MouthColor;
  };
  facialHair?: {
    type: FacialHairType;
    color: HairColor;
  };
  clothes: {
    type: ClothesType;
    color: ClothesColor;
  };
  accessories?: {
    type: AccessoriesType;
    color: AccessoriesColor;
  };
  background: {
    type: BackgroundType;
    color: BackgroundColor;
  };
}

export const DEFAULT_AVATAR: Avatar = {
  face: {
    type: FaceType.Face1,
    color: SkinColor.Light,
  },
  hair: {
    type: HairType.Hair1,
    color: HairColor.Blond,
  },
  eyes: {
    type: EyesType.EyesRound,
    color: EyesColor.Blue,
  },
  eyebrows: {
    type: EyebrowsType.Eyebrows1,
    color: HairColor.Blond,
  },
  nose: {
    type: NoseType.Nose1,
  },
  mouth: {
    type: MouthType.MouthSmilingOpened,
    color: MouthColor.Pink,
  },
  clothes: {
    type: ClothesType.Body1,
    color: ClothesColor.Red,
  },
  background: {
    type: BackgroundType.Background1,
    color: BackgroundColor.White,
  },
};
