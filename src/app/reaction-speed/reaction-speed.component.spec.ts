import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionSpeedComponent } from './reaction-speed.component';

describe('ReactionSpeedComponent', () => {
  let component: ReactionSpeedComponent;
  let fixture: ComponentFixture<ReactionSpeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionSpeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
