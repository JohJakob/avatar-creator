export enum SkinColor {
  Light = 'skin-light',
  Medium = 'skin-medium',
  Dark = 'skin-dark',
}

export enum HairColor {
  Blond = 'hair-blond',
  Brown = 'hair-brown',
  Dark = 'hair-dark',
  Red = 'hair-red',
  Grey = 'hair-grey',
}

export enum EyesColor {
  Brown = 'eyes-brown',
  Blue = 'eyes-blue',
  Green = 'eyes-green',
}

export enum MouthColor {
  Pink = 'mouth-pink',
  Coral = 'mouth-coral',
  Red = 'mouth-red',
}

export enum ClothesColor {
  Blue = 'clothes-blue',
  Green = 'clothes-green',
  Red = 'clothes-red',
  Purple = 'clothes-purple',
  Yellow = 'clothes-yellow',
  Pink = 'clothes-pink',
  Black = 'clothes-black',
  White = 'clothes-white',
}

export enum AccessoriesColor {
  Gold = 'accessories-gold',
  Silver = 'accessories-silver',
}

export enum BackgroundColor {
  White = 'background-white',
  Blue = 'background-blue',
}

export type AvatarColor =
  | SkinColor
  | HairColor
  | EyesColor
  | MouthColor
  | ClothesColor
  | AccessoriesColor
  | BackgroundColor;
