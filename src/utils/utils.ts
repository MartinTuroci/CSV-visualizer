declare type mappingFunc = (value: never, index: number, array: never[]) => number;
export const getMaxMin = (arr: [], mapFunction: mappingFunc): { max: number; min: number } => {
  const mappedArr = arr.map(mapFunction);
  let max = 0,
    min = 0;
  mappedArr.forEach((currentNumber: number) => {
    max = max > currentNumber ? max : currentNumber;
    min = min < currentNumber ? min : currentNumber;
  });

  return { max, min };
};
