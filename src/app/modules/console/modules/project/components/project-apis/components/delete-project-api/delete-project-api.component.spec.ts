import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProjectApiComponent } from './delete-project-api.component';

describe('DeleteProjectApiComponent', () => {
  let component: DeleteProjectApiComponent;
  let fixture: ComponentFixture<DeleteProjectApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteProjectApiComponent]
    });
    fixture = TestBed.createComponent(DeleteProjectApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
