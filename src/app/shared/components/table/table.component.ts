import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

class Column<T> {
  name?: keyof T;
  type: ColumnType;
  sortable?: boolean;

  public constructor(init?: Partial<Column<T>>) {
    Object.assign(this, init);
  }
}

export class Table<T> {
  columns: Column<T>[] = [];
  rows: Row<T>[] = [];
  isEditable: boolean;
  pageLimit: number;

  public constructor(init?: Partial<Column<T>>) {
    Object.assign(this, init);
  }
}

class Row<T> {
  values: T;
  routerLink?: string;

  public constructor(init?: Partial<Column<T>>) {
    Object.assign(this, init);
  }
}

export enum ColumnType {
  text,
  hyperlink,
  image,
  checkbox,
  button
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, AfterViewInit {
  @Input() table: Table<T>;

  public dataSource = new MatTableDataSource<Row<T>>();
  public selection = new SelectionModel<Row<T>>(true, []);
  public columnNames: string[];
  public columnType = ColumnType;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.table.rows;
    this.columnNames = this.table.columns.map((column) => column.name.toString());
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addData(): void {

  }

  removeData(): void {

  }

  determineHasColumnHeader(type: ColumnType): boolean {
    return type === ColumnType.text
      || type === ColumnType.hyperlink
      || type === ColumnType.image;
  }
}

export class TableBuilder<T extends object> {
  table: Table<T>;
  data: Array<T>;

  constructor(data: Array<T>) {
    this.table = new Table();
    this.data = data;
  }

  public build(): Table<T> {
    this.fillRows();
    return this.table;
  }

  public fillRows(): void {
    this.data.forEach(element => {
      const row = new Row<T>();
      row.values = element;
      this.table.rows.push(row);
    });
  }

  public addColumn(key: any, type: ColumnType, sortable: boolean): TableBuilder<T> {
    this.table.columns.push(new Column({name: key, type, sortable}));
    return this;
  }

  public addCheckbox(): TableBuilder<T> {
    return this.addColumn('checkbox', ColumnType.checkbox, false);
  }

  public addButton(): TableBuilder<T> {
    return this.addColumn('button', ColumnType.button, false);
  }
}
