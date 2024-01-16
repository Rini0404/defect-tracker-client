
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

export const defectCategoryMapping = {
  HumanError: ['FoldOver', 'UpsideDown', 'Ghost', 'Color', 'Bruised', 'TopBottomVoid', 'TiltVoid', 'Degree180', 'Mismatch', 'SizeMixUp', 'Overlap', 'SidewaysFade'],
  MachineError: ['Blur', 'Crispy', 'Faded', 'PrintError', 'Discoloration'],
  ManufacturerError: ['ThreadVoid', 'FoldVoid', 'HeelVoid', 'FaultyYarn', 'Holes'],
};


export type DefectCategoryData = Array<{
  defectType: DefectType;
  length: number; timestamp: string 
}>;


export type DefectData = { timestamp: string; /* other properties */ };
export type DefectTypeData = { [key in DefectType]?: DefectData[] };

export type DefectJsonTypes = {
  [key in DefectCategory]?: DefectTypeData;
};
