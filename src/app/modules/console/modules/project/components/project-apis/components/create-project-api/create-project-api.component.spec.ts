import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectApiComponent } from './create-project-api.component';

describe('CreateProjectApiComponent', () => {
  let component: CreateProjectApiComponent;
  let fixture: ComponentFixture<CreateProjectApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProjectApiComponent]
    });
    fixture = TestBed.createComponent(CreateProjectApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
