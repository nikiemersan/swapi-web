export interface ListItems<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ReduxPromiseAction<T> {
  type?: string;
  result?: T;
  error?: any;
  options?: {
    transformer: Function;
    callback?: Function;
  };
}

export interface KeyValueByVariable<T> {
  [key: string]: T;
}
