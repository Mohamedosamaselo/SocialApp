import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Messageinput } from './messageinput';

describe('Messageinput', () => {
  let component: Messageinput;
  let fixture: ComponentFixture<Messageinput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Messageinput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Messageinput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
