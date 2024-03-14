import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionNameSettingComponent } from './collection-name-setting.component';

describe('CollectionNameSettingComponent', () => {
  let component: CollectionNameSettingComponent;
  let fixture: ComponentFixture<CollectionNameSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionNameSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectionNameSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
