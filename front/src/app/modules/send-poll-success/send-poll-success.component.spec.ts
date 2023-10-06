import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPollSuccessComponent } from './send-poll-success.component';

describe('SendPollSuccessComponent', () => {
  let component: SendPollSuccessComponent;
  let fixture: ComponentFixture<SendPollSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendPollSuccessComponent]
    });
    fixture = TestBed.createComponent(SendPollSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
