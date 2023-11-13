import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectApisComponent } from './project-apis.component';

describe('ProjectApisComponent', () => {
  let component: ProjectApisComponent;
  let fixture: ComponentFixture<ProjectApisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectApisComponent]
    });
    fixture = TestBed.createComponent(ProjectApisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
