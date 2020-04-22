interface SimplifiedTypeMap {
  string: string;
  number: number;
  boolean: boolean;
}

interface ArrayedTypeMap<T = {}> {
  single: T[keyof T];
  array: T[keyof T][];
}

type GlobalMethodAdd = <
  T extends keyof SimplifiedTypeMap,
  AT extends ArrayedTypeMap<Pick<SimplifiedTypeMap, T>>,
  A extends keyof AT
>(
  name: string,
  types: T[],
  array: A,
  method: () => AT[A]
) => void;

interface MethodStore {
  [name: string]: {
    types: (keyof SimplifiedTypeMap)[];
    array: keyof ArrayedTypeMap;
    method: () => unknown;
  };
}

export const methodStorage: MethodStore = {};

type TEST = keyof ArrayedTypeMap;
type TEST2 = ArrayedTypeMap<SimplifiedTypeMap>[TEST];

const addMethod: GlobalMethodAdd = (name, types, array, method) => {
  methodStorage[name] = {
    types: types as (keyof SimplifiedTypeMap)[],
    array: array as keyof ArrayedTypeMap,
    method
  };
};

addMethod("test", ["string", "number"], "array", () => [
  Math.random() > 0.5 ? "abcd" : 1234,
  Math.random() > 0.5 ? "abcd" : 1234,
  Math.random() > 0.5 ? "abcd" : 1234,
  "true",
  12341
]);
