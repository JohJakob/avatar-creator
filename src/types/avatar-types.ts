export enum FaceType {
  Face1 = 'face1',
  Face2 = 'face2',
}

export enum HairType {
  Hair1 = 'hair1',
  Hair2 = 'hair2',
}

export enum EyesType {
  Eyes1 = 'eyes1',
  Eyes2 = 'eyes2',
}

export enum EyebrowsType {
  Eyebrows1 = 'eyebrows1',
  Eyebrows2 = 'eyebrows2',
}

export enum MouthType {
  Mouth1 = 'mouth1',
  Mouth2 = 'mouth2',
}

export enum FacialHairType {
  Beard = 'beard',
  Moustache = 'moustache',
}

export enum ClothesType {
  Shirt = 'shirt',
  Tshirt = 'tshirt',
  Sweater = 'sweater',
}

export enum AccessoriesType {
  Beads = 'beads',
  Necklace = 'necklace',
}

export enum BackgroundType {
  Background1 = 'background1',
  Background2 = 'background2',
}

export type AvatarType = ClothesType | EyesType | EyebrowsType | MouthType | FaceType | HairType | BackgroundType;
