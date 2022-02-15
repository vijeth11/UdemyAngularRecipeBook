import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeActionsComponent } from './challenge-actions.component';

describe('ChallengeActionsComponent', () => {
  let component: ChallengeActionsComponent;
  let fixture: ComponentFixture<ChallengeActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
