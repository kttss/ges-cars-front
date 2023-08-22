export declare interface IDataSource {
  mode: IMode;
  columns: IColumns[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[];
}

declare interface IMode {
  edit: boolean;
  delete: boolean;
  detail: boolean;
  create?: boolean;
}

declare interface IColumns {
  key: string;
  title: string;
  width?: number;
  type?: 'string' | 'date';
  orderKey?: string;
}
