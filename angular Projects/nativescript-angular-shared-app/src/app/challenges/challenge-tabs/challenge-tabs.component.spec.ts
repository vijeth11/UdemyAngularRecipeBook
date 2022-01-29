import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeTabsComponent } from './challenge-tabs.component';

describe('ChallengeTabsComponent', () => {
  let component: ChallengeTabsComponent;
  let fixture: ComponentFixture<ChallengeTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
