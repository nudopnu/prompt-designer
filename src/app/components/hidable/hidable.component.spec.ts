import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HidableComponent } from './hidable.component';

describe('HidableComponent', () => {
  let component: HidableComponent;
  let fixture: ComponentFixture<HidableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HidableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HidableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
