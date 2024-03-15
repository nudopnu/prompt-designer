import { Component, HostListener, OnDestroy, model } from '@angular/core';
import { connectOnChange } from '../../lib/utils';

@Component({
  selector: 'pro-editable-label',
  templateUrl: './editable-label.component.html',
  styleUrl: './editable-label.component.scss'
})
export class EditableLabelComponent implements OnDestroy {

  editableLabel = model("");
  isEdited = false;
  isHovered = false;
  model = model<string>();
  subscription: any;

  constructor() {
    this.subscription = connectOnChange(this.model, this.editableLabel, (src, dst) => src ? src : "");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('click')
  onClick() {
    this.isEdited = true;
  }

  onSubmit() {
    this.model.set(this.editableLabel());
    this.isEdited = false;
  }
}
