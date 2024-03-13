import { NgModule } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconDefinition } from '@ant-design/icons-angular';
import { CopyOutline, SearchOutline, PlusOutline, SettingOutline, LoadingOutline, DownloadOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const icons: IconDefinition[] = [
  CopyOutline,
  SearchOutline,
  PlusOutline,
  SettingOutline,
  LoadingOutline,
  DownloadOutline,
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
    NzToolTipModule,
    NzCollapseModule,
    NzTabsModule,
  ]
})
export class ZorroModule { }
