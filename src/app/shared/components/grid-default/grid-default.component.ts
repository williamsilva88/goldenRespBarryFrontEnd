import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { numberMaskOntime } from '../../utils';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-grid-default',
  templateUrl: './grid-default.component.html',
  styleUrls: ['./grid-default.component.scss'],
})
export class GridDefaultComponent implements OnChanges {
  @Input()
  data?: any[] = [];

  @Input()
  columns?: any[] = [];

  @Input()
  title?: string = '';

  @Input()
  subtitle?: string = '';

  @Output()
  filterSelect = new EventEmitter();

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();
  columnsSource: any[] = [];
  filterSelectList: any = {};

  ngOnChanges() {
    this.initValues();
  }

  initValues(){
    this.columnsSource = this.columns ? this.columns : [];
    this.displayedColumns = [];
    this.columnsSource.forEach((value) => {
      if (value?.field) {
        this.displayedColumns.push(value.field);
      }
    });
    this.dataSource = new MatTableDataSource(this.data);
  }

  getHeaderStyle(data: any) {
    if (data?.headerStyle) {
      return data?.headerStyle;
    } else {
      return {};
    }
  }

  getFilter(data: any) {
    return data?.filter ? true : false;
  }

  search(event: any, reg: any) {
    if (event?.target?.value) {
      this.filterSelectList[reg.field] = {
        value: event.target.value,
        data: reg,
      };
    } else {
      delete this.filterSelectList[reg.field];
    }
    console.log("filterSelectList:",this.filterSelectList);
    this.filterSelect.emit(this.filterSelectList);
  }

  validValue(event: any, reg: any) {
    if (reg?.filterType === 'number') {
      reg.filterValue = numberMaskOntime(event);
    }
  }

  filterSwitch(reg: any) {
    if (!reg?.filterSwitchSelected && reg.filterSwitchList?.length > 0) {
      reg.filterSwitchSelected = 1;
    } else if (reg?.filterSwitchSelected >= reg?.filterSwitchList?.length - 1) {
      reg.filterSwitchSelected = 0;
    } else {
      reg.filterSwitchSelected = reg.filterSwitchSelected + 1;
    }

    if (reg?.filterSwitchList[reg.filterSwitchSelected]?.id?.toString()) {
      this.filterSelectList[reg.field] = {
        value: reg?.filterSwitchList[reg.filterSwitchSelected]?.id,
        data: reg,
      };
      reg.filterSwitchSelectedLabel =
        reg?.filterSwitchList[reg.filterSwitchSelected]?.label;
    } else {
      delete this.filterSelectList[reg.field];
      delete reg.filterSwitchSelectedLabel;
    }
    console.log("filterSelectList:",this.filterSelectList);
    this.filterSelect.emit(this.filterSelectList);
  }

  filterComboShow(reg: any) {
    reg.filterComboShow = reg?.filterComboShow ? false : true;
  }

  filterComboSelect(reg: any, item: any) {
    this.filterComboShow(reg);
    if (item?.id?.toString()) {
      this.filterSelectList[reg.field] = {
        value: item.id,
        data: reg,
      };
      reg.filterComboSelected = item.label;
    } else {
      delete this.filterSelectList[reg.field];
      delete reg.filterComboSelected;
    }

    this.filterSelect.emit(this.filterSelectList);
  }
}
