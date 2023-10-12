import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HePollComponent } from './he-poll.component';

describe('HePollComponent', () => {
  let component: HePollComponent;
  let fixture: ComponentFixture<HePollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HePollComponent]
    });
    fixture = TestBed.createComponent(HePollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
