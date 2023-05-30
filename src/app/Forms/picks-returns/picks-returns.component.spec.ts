import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicksReturnsComponent } from './picks-returns.component';

describe('PicksReturnsComponent', () => {
  let component: PicksReturnsComponent;
  let fixture: ComponentFixture<PicksReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicksReturnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicksReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
