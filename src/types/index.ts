
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
  Discoloration = 'Discoloration',

  // Manufacturer Error
  ThreadVoid = 'ThreadVoid',
  FoldVoid = 'FoldVoid',
  HeelVoid = 'HeelVoid',
  FaultyYarn = 'FaultyYarn',
  Holes = 'Holes',
}

export const defectCategoryMapping = {
  HumanError: [DefectType.FoldOver, DefectType.UpsideDown, DefectType.Ghost, DefectType.Color, DefectType.Bruised, DefectType.TopBottomVoid, DefectType.TiltVoid, DefectType.Degree180, DefectType.Mismatch, DefectType.SizeMixUp, DefectType.Overlap, DefectType.SidewaysFade],
  MachineError: [DefectType.Blur, DefectType.Crispy, DefectType.Faded, DefectType.PrintError, DefectType.Discoloration],
  ManufacturerError: [DefectType.ThreadVoid, DefectType.FoldVoid, DefectType.HeelVoid, DefectType.FaultyYarn, DefectType.Holes],
};


export type DefectCategoryData = Array<{
  defectType: DefectType;
  length: number; timestamp: string
}>;


export type DefectData = { timestamp: string; };
export type DefectTypeData = { [key in DefectType]?: DefectData[] };

export type DefectJsonTypes = {
  [category: string]: {
    [defectType: string]: DefectData[];
  };
};
