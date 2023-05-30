import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseMainTableComponent } from './warehouse-main-table.component';

describe('WarehouseMainTableComponent', () => {
  let component: WarehouseMainTableComponent;
  let fixture: ComponentFixture<WarehouseMainTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseMainTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseMainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
