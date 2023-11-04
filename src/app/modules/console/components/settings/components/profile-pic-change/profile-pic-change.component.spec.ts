import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicChangeComponent } from './profile-pic-change.component';

describe('ProfilePicChangeComponent', () => {
  let component: ProfilePicChangeComponent;
  let fixture: ComponentFixture<ProfilePicChangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePicChangeComponent]
    });
    fixture = TestBed.createComponent(ProfilePicChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
