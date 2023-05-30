import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMainTableComponent } from './project-main-table.component';

describe('ProjectMainTableComponent', () => {
  let component: ProjectMainTableComponent;
  let fixture: ComponentFixture<ProjectMainTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMainTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
