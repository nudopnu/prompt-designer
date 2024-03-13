import { NgModule } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconDefinition } from '@ant-design/icons-angular';
import { CopyOutline, SearchOutline, PlusOutline, SettingOutline, LoadingOutline, DownloadOutline, SyncOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';

const icons: IconDefinition[] = [
  CopyOutline,
  SearchOutline,
  PlusOutline,
  SettingOutline,
  LoadingOutline,
  DownloadOutline,
  SyncOutline,
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
    NzSelectModule,
    NzSliderModule,
  ]
})
export class ZorroModule { }
