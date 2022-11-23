import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { isEmpty } from '../../utils';
import { columnsDefault, comboField, dataDefault } from './data-default-test';

import { GridDefaultComponent } from './grid-default.component';

describe(GridDefaultComponent.name, () => {
  let component: GridDefaultComponent;
  let fixture: ComponentFixture<GridDefaultComponent>;
  const data = dataDefault;
  const columns = columnsDefault;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridDefaultComponent],
      imports: [MatTableModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GridDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`${GridDefaultComponent.prototype.initValues.name} should process initValues when (@Inputs) is assigned`, () => {
    component.data = data;
    component.columns = columns;
    component.title = 'TITULO';
    component.subtitle = 'SUBTITULO';
    fixture.detectChanges();
    component.initValues();
    expect(component.data.length).withContext('error data').toBe(2);
    expect(component.columns.length).withContext('error columns').toBe(4);
    expect(component.displayedColumns.length).withContext('error displayedColumns').toBe(4);
    expect(component.title).withContext('error title').toBe('TITULO');
    expect(component.subtitle).withContext('error subtitle').toBe('SUBTITULO');
    expect(4)
      .withContext('error columnsSource')
      .toBe(component.columnsSource.length);
    expect(2)
      .withContext('error dataSource')
      .toBe((component.dataSource.data as any).length);
  });

  it('should assign input parameters in ngOnChanges when (@Inputs) is assigned', () => {
    component.data = data;
    component.columns = columns;
    fixture.detectChanges();
    const change: SimpleChanges = {
      columns: new SimpleChange([], component.columnsSource, true),
      data: new SimpleChange([], component.data, true),
    };
    component.ngOnChanges();
    expect(4)
      .withContext('error columnsSource')
      .toBe(component.columnsSource.length);
    expect(2)
      .withContext('error dataSource')
      .toBe((component.dataSource.data as any).length);
  });

  it(`${GridDefaultComponent.prototype.filterComboSelect.name} should process values in filterComboSelect when called and assemble object from selected`, () => {
    component.data = data;
    component.columns = columns;
    fixture.detectChanges();
    let dataResult: any = null;
    component.filterSelect.subscribe((value) => {
      dataResult = value;
    });
    component.filterComboSelect(comboField, comboField.filterComboList[0]);
    expect(1).toBe(dataResult['winner'].value);
  });

  it(`${GridDefaultComponent.prototype.filterSwitch.name} should process values in filterSwitch when called and assemble object from selected`, () => {
    component.data = data;
    component.columns = columns;
    fixture.detectChanges();
    let dataResult: any = null;
    component.filterSelect.subscribe((value) => {
      dataResult = value;
    });
    component.filterSwitch(columnsDefault[3]);
    expect(2).toBe(dataResult['winner'].value);
    component.filterSwitch(columnsDefault[3]);
    expect(3).toBe(dataResult['winner'].value);
    component.filterSwitch(columnsDefault[3]);
    expect(1).toBe(dataResult['winner'].value);
  });

  it(`${GridDefaultComponent.prototype.filterComboShow.name} should process values in filterComboShow when called`, () => {
    const combo = {...comboField};
    component.filterComboShow(combo);
    expect(false).toBe((combo as any).filterComboShow);
    component.filterComboShow(combo);
    expect(true).toBe((combo as any).filterComboShow);
  });

  it(`${GridDefaultComponent.prototype.getFilter.name} should process values in getFilter when called`, () => {
    const columns = {...columnsDefault[3]};
    expect(true).toBe(component.getFilter(columns));
  });

  it(`${GridDefaultComponent.prototype.getHeaderStyle.name} should process values in getHeaderStyle when called`, () => {
    const columns = {...columnsDefault[3]};
    expect(false).toBe(isEmpty(component.getHeaderStyle(columns)));
  });

  it(`${GridDefaultComponent.prototype.search.name} should process values in search when called`, () => {
    let dataResult: any = null;
    component.filterSelect.subscribe((value) => {
      dataResult = value;
    });
    component.search({target:{value:'2018'}}, columnsDefault[1]);
    expect('2018').toBe(dataResult['year'].value);
  });

  it(`${GridDefaultComponent.prototype.validValue.name} should process values in validValue when called`, () => {
    const data = {...columnsDefault[1]};
    let dataResult: any = null;
    component.filterSelect.subscribe((value) => {
      dataResult = value;
    });
    component.validValue({target:{value:'dd2018aaa'}}, data);
    expect('2018').toBe((data as any).filterValue);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
