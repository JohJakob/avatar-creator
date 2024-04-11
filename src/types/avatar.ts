import {
  AccessoriesColor,
  BackgroundColor,
  ClothesColor,
  EyesColor,
  HairColor,
  MouthColor,
  SkinColor,
} from './avatar-colors.js';
import { BackgroundExtra, EyesExtra, HairExtra } from './avatar-extras.js';
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
} from './avatar-types.js';

export interface Avatar {
  face: {
    type: FaceType;
    color: SkinColor;
  };
  hair?: {
    type: HairType;
    color: HairColor;
    extra?: HairExtra;
  };
  eyes: {
    type: EyesType;
    color: EyesColor;
    extra?: EyesExtra;
  };
  eyebrows: {
    type: EyebrowsType;
    color: HairColor;
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
    extra?: BackgroundExtra;
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
    type: EyesType.Eyes1,
    color: EyesColor.Black,
  },
  eyebrows: {
    type: EyebrowsType.Eyebrows1,
    color: HairColor.Blond,
  },
  mouth: {
    type: MouthType.Mouth1,
    color: MouthColor.Pink,
  },
  clothes: {
    type: ClothesType.Tshirt,
    color: ClothesColor.Red,
  },
  background: {
    type: BackgroundType.Background1,
    color: BackgroundColor.White,
    extra: BackgroundExtra.Logo,
  },
};
