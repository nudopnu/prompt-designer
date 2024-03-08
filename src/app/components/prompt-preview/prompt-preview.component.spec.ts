import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptPreviewComponent } from './prompt-preview.component';

describe('PromptPreviewComponent', () => {
  let component: PromptPreviewComponent;
  let fixture: ComponentFixture<PromptPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromptPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
