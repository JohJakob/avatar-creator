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

export const colorsMap: { [key in AvatarColor]: string } = {
  [SkinColor.Light]: '#FFD6C7',
  [SkinColor.Medium]: '#966E60',
  [SkinColor.Dark]: '#71473C',

  [HairColor.Black]: '#000000',
  [HairColor.Dark]: '#361900',
  [HairColor.Brown]: '#533500',
  [HairColor.Blonde]: '#EBBF67',
  [HairColor.Grey]: '#808080',
  [HairColor.Ginger]: '#E74B26',
  [HairColor.Red]: '#FF0000',
  
  [EyesColor.Brown]: '#4E2031',
  [EyesColor.Blue]: '#0190BA',
  [EyesColor.Green]: '#91A567',
  
  [MouthColor.Pink]: '#FC96E7',
  [MouthColor.Coral]: '#FF7373',
  [MouthColor.Red]: '#C51010',
  
  [ClothesColor.Blue]: '#0077FF',
  [ClothesColor.Green]: '#0DBD83',
  [ClothesColor.Red]: '#FF5252',
  [ClothesColor.Purple]: '#7263D0',
  [ClothesColor.Yellow]: '#FFA600',
  [ClothesColor.Pink]: '#F65C96',
  [ClothesColor.Black]: '#000000',
  [ClothesColor.White]: '#FFFFFF',
  
  [AccessoriesColor.Gold]: '#FFD700',
  [AccessoriesColor.Silver]: '#C0C0C0',
  [BackgroundColor.White]: '#FFFFFF',
  [BackgroundColor.Blue]: '#0000FF',
};
