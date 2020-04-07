import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltreTestComponent } from './altre-test.component';

describe('AltreTestComponent', () => {
  let component: AltreTestComponent;
  let fixture: ComponentFixture<AltreTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltreTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltreTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
