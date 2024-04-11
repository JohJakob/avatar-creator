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

export const defaultAvatar: Avatar = {
  face: {
    type: 'face1',
    color: 'light',
  },
  hair: {
    type: 'hair1',
    color: 'blond',
  },
  eyes: {
    type: 'eyes1',
    color: 'black',
  },
  eyebrows: {
    type: 'eyebrows1',
    color: 'blond',
  },
  mouth: {
    type: 'mouth1',
    color: 'pink',
  },
  facialHair: {
    type: 'beard',
    color: 'blond',
  },
  clothes: {
    type: 'tshirt',
    color: 'red',
  },
  background: {
    type: 'background1',
    color: 'white',
    extra: 'logo',
  },
};

export type SkinColor = 'light' | 'medium' | 'dark';
export type HairColor = 'blond' | 'brown' | 'dark' | 'red' | 'grey';
export type EyesColor = 'black' | 'brown' | 'blue' | 'green';
export type MouthColor = 'pink' | 'coral' | 'red';
export type ClothesColor = 'red' | 'blue' | 'black' | 'white';
export type AccessoriesColor = 'gold' | 'silver';
export type BackgroundColor = 'white' | 'blue';

export type FaceType = 'face1' | 'face2';
export type HairType = 'hair1' | 'hair2';
export type EyesType = 'eyes1' | 'eyes2';
export type EyebrowsType = 'eyebrows1' | 'eyebrows2';
export type MouthType = 'mouth1' | 'mouth2';
export type FacialHairType = 'beard' | 'moustache';
export type ClothesType = 'shirt' | 'tshirt' | 'sweater';
export type AccessoriesType = 'beads' | 'necklace';
export type BackgroundType = 'background1' | 'background2';

export type HairExtra = 'ribbon' | 'hat' | 'cap';
export type EyesExtra = 'glasses' | 'sunglasses';
export type BackgroundExtra = 'logo';
