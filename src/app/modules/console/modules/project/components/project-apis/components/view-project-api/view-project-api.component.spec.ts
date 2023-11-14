import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectApiComponent } from './view-project-api.component';

describe('ViewProjectApiComponent', () => {
  let component: ViewProjectApiComponent;
  let fixture: ComponentFixture<ViewProjectApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjectApiComponent]
    });
    fixture = TestBed.createComponent(ViewProjectApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
