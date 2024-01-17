export const formatDefectType = (defectType: string) => {
  // Split the string at each uppercase letter and join with a newline
  return defectType.replace(/([A-Z])/g, " $1").trim();
};

export const newLineFormater = (defectType: string) => {
  // Check if the defectType is in the exception list
  if (exceptionList.hasOwnProperty(defectType)) {
    // Apply custom formatting for the specific word
    return defectType.replace(exceptionList[defectType].pattern, exceptionList[defectType].replacement);
  } else {
    // Split the string at each uppercase letter and join with a space
    return defectType.replace(/([A-Z])/g, " $1").trim();
  }
};

// Define an index signature for the exceptionList object
interface ExceptionList {
  [key: string]: {
    pattern: RegExp;
    replacement: string;
  };
}

const exceptionList: ExceptionList = {
  "Discoloration": {
    pattern: /(Discoloration)/i,
    replacement: "Disc-\noloration"
  },
  "Degree180": {
    pattern: /(Degree180)/i,
    replacement: "Degree-\n180"
  },
  "FaultyYarn": {
    pattern: /(FaultyYarn)/i,
    replacement: "Faulty-\nYarn"
  },
  "TopBottomVoid": {
    pattern: /(TopBottomVoid)/i,
    replacement: "Top\n-Bottom\nVoid"
  },

};
