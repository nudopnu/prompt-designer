import { NgModule } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconDefinition } from '@ant-design/icons-angular';
import { CopyOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons: IconDefinition[] = [
  CopyOutline,
];

@NgModule({
  declarations: [],
  imports: [
    NzIconModule.forRoot(icons)
  ],
  exports: [
    NzInputModule,
    NzButtonModule,
    NzIconModule,
  ]
})
export class ZorroModule { }
