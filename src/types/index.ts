
export enum DefectCategory {
  HumanError = 'HumanError',
  MachineError = 'MachineError',
  ManufacturerError = 'ManufacturerError'
}

export enum DefectType {
  // Human Error
  FoldOver = 'FoldOver',
  UpsideDown = 'UpsideDown',
  Ghost = 'Ghost',
  Color = 'Color',
  Bruised = 'Bruised',
  TopBottomVoid = 'TopBottomVoid',
  TiltVoid = 'TiltVoid',
  Degree180 = 'Degree180',
  Mismatch = 'Mismatch',
  SizeMixUp = 'SizeMixUp',
  Overlap = 'Overlap',
  SidewaysFade = 'SidewaysFade',

  // Machine Error
  Blur = 'Blur',
  Crispy = 'Crispy',
  Faded = 'Faded',
  PrintError = 'PrintError',
  Discoloration   = 'Discoloration',

  // Manufacturer Error
  ThreadVoid = 'ThreadVoid',
  FoldVoid = 'FoldVoid',
  HeelVoid = 'HeelVoid',
  FaultyYarn = 'FaultyYarn',
  Holes = 'Holes',
}


export type DefectCategoryData = Array<{
  length: number; timestamp: string 
}>;

export type DefectJsonTypes = {
  [key: string]: DefectCategoryData | undefined;
  HumanError?: DefectCategoryData;
  MachineError?: DefectCategoryData;
  ManufacturerError?: DefectCategoryData;
};