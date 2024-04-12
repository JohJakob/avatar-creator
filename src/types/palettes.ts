import { ClothesColor, HairColor, SkinColor } from './avatar-colors.js';
import { ClothesType, EyebrowsType, EyesType, FaceType, HairType, MouthType, NoseType } from './avatar-types.js';

export const typePaletteMap = new Map<string, string[]>([
  ['face', Object.values(FaceType)],
  ['hair', Object.values(HairType)],
  ['eyes', Object.values(EyesType)],
  ['eyebrows', Object.values(EyebrowsType)],
  ['nose', Object.values(NoseType)],
  ['mouth', Object.values(MouthType)],
  ['clothes', Object.values(ClothesType)],
]);

export const colorPaletteMap = new Map<string, string[]>([
  ['face', Object.values(SkinColor)],
  ['hair', Object.values(HairColor)],
  ['clothes', Object.values(ClothesColor)],
]);
