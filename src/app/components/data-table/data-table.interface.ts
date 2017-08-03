export interface TableField {
   name: string;
   title: string;
   dataType: 'date' | 'string' | 'number';
   pattern?: string;
   svg: string;
   active: boolean;
   ascSort: boolean;
   isFiltered: boolean;
}
