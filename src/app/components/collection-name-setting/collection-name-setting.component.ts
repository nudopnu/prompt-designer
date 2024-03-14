import { Component, Signal, WritableSignal, model } from '@angular/core';
import { ConversationsService } from '../../services/conversations.service';

@Component({
  selector: 'pro-collection-name-setting',
  templateUrl: './collection-name-setting.component.html',
  styleUrl: './collection-name-setting.component.scss'
})
export class CollectionNameSettingComponent {
  collectionName: string;
  isLoading = false;

  constructor(private conversationService: ConversationsService) {
    this.collectionName = conversationService.currentCollection();
  }

  onClickSyncHost() {
    this.isLoading = true;
    this.conversationService.setCollection(this.collectionName)
      .subscribe(() => this.isLoading = false);
  }

}
