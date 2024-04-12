export enum SkinColor {
  Light = 'skin-light',
  Medium = 'skin-medium',
  Dark = 'skin-dark',
}

export enum HairColor {
  Black = 'hair-black',
  Dark = 'hair-dark',
  Brown = 'hair-brown',
  Blonde = 'hair-blonde',
  Grey = 'hair-grey',
  Ginger = 'hair-ginger',
  Red = 'hair-red',
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
  Sky = 'background-sky',
  Rose = 'background-rose',
  Mint = 'background-mint',
  Lemon = 'background-lemon',
  Purple = 'background-purple',
  Sand = 'background-sand',
}

export type AvatarColor =
  | SkinColor
  | HairColor
  | EyesColor
  | MouthColor
  | ClothesColor
  | AccessoriesColor
  | BackgroundColor;
