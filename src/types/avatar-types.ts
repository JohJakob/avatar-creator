export enum FaceType {
  Face1 = 'face_01',
}

export enum HairType {
  Hair1 = 'hair_01',
  Hair2 = 'hair_02',
  Hair3 = 'hair_03',
}

export enum HairAccessoriesType {
  Ribbon = 'ribbon',
  Hat = 'hat',
  Cap = 'cap',
}

export enum EyesType {
  EyesRound = 'eyes_round',
  EyesSmiling = 'eyes_smiling',
  EyesWide = 'eyes_wide',
}

export enum EyesAccessoriesType {
  Glasses = 'glasses',
  Sunglasses = 'sunglasses',
}

export enum EyebrowsType {
  Eyebrows1 = 'eyebrows_01',
}

export enum NoseType {
  Nose1 = 'nose',
}

export enum MouthType {
  MouthSmilingOpened = 'mouth_smiling_opened',
  MouthSmilingRight = 'mouth_smiling_right',
  MouthSmirk = 'mouth_smirk',
}

export enum FacialHairType {
  Beard = 'beard',
  Moustache = 'moustache',
}

export enum ClothesType {
  Body1 = 'body_01',
}

export enum AccessoriesType {
  Beads = 'beads',
  Necklace = 'necklace',
}

export enum BackgroundType {
  Background1 = 'plain',
  Background2 = 'with-logo',
}

export type AvatarType =
  | FaceType
  | HairType
  | HairAccessoriesType
  | EyesType
  | EyesAccessoriesType
  | EyebrowsType
  | NoseType
  | MouthType
  | FacialHairType
  | ClothesType
  | AccessoriesType
  | BackgroundType;
