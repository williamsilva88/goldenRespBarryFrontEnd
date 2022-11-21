import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDefaultComponent } from './grid-default.component';

describe('GridDefaultComponent', () => {
  let component: GridDefaultComponent;
  let fixture: ComponentFixture<GridDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
