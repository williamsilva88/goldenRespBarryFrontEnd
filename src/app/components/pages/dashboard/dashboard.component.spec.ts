import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { GridDefaultComponent } from 'src/app/shared/components/grid-default/grid-default.component';
import { MainState } from 'src/app/state/main.state';
import { ContainerPageComponent } from '../../core/container/container-page/container-page.component';
import { HeaderModule } from '../../core/header/header.module';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        ContainerPageComponent,
        GridDefaultComponent,
      ],
      imports: [
        HttpClientModule,
        NgxsModule.forRoot([MainState]),
        HeaderModule,
        RouterTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
