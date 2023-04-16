export const isEqualArrays = (a: any[], b: any[]) => {
  if (a === b) {
    return true;
  }

  if (a?.length !== b?.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

export const isEqualObjects = (a: any, b: any) => {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const onlyUnique = (value: any, index: number, self: any) => {
  return self.indexOf(value) === index;
};
