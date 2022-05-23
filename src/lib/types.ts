

export interface Options {
  debug?: boolean; // default false
  emitClickActions?: string[]; // default ['View/Edit', 'View / Edit', 'View', 'Edit']
  bulkActions?: string[];
  noOfRowsToDisplay?: number;
  singleActions?: string[] | { title: string; showIf: (fieldData: any, rowData: any) => any }[];
};


export interface Head {
  title: string;
  hideable: boolean;
  key: string;

  type?: 'date'| 'number' | 'string'
  transform?:
  (fieldData: any, rowData: any) => any,
  html?:(fieldData: any) => string; // default string
}[];




