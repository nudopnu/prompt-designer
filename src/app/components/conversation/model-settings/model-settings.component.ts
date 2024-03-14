import { Component, Signal, WritableSignal, computed } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ConversationComponent } from '../conversation.component';
import { ConversationsService } from '../../../services/conversations.service';

@Component({
  selector: 'pro-model-settings',
  templateUrl: './model-settings.component.html',
  styleUrl: './model-settings.component.scss'
})
export class ModelSettingsComponent {
  host = "http://localhost:8000"
  temperature: number = 1;
  models: Signal<string[]>;
  selectedModel: Signal<string>;
  isLoading = false;

  constructor(
    private apiService: ApiService,
    private conversationsServive: ConversationsService
  ) {
    this.models = conversationsServive.models;
    this.selectedModel = computed(() => conversationsServive.modelParams().model!);
  }

  onClickSyncHost() {
    this.isLoading = true;
    this.apiService.getModels()
      .subscribe(models => {
        this.conversationsServive.models.set(models);
        this.isLoading = false;
      });
  }

  onChangeModel(model: string) {
    this.conversationsServive.modelParams
      .update(params => ({ ...params, model }));
  }
}
