import { Component, OnDestroy, Signal, computed, model } from '@angular/core';
import { Subscription } from 'rxjs';
import { connectOnChange } from '../../../lib/utils';
import { ApiService } from '../../../services/api.service';
import { ConversationsService } from '../../../services/conversations.service';


@Component({
  selector: 'pro-model-settings',
  templateUrl: './model-settings.component.html',
  styleUrl: './model-settings.component.scss'
})
export class ModelSettingsComponent implements OnDestroy {

  host = "http://localhost:8000"
  temperature = model(1);
  models: Signal<string[]>;
  selectedModel: Signal<string>;
  isLoading = false;
  subscription: Subscription;

  constructor(
    private apiService: ApiService,
    private conversationsServive: ConversationsService
  ) {
    this.models = conversationsServive.models;
    this.selectedModel = computed(() => conversationsServive.modelParams().model!);
    this.temperature.set(conversationsServive.modelParams().temperature);
    this.subscription = connectOnChange(this.temperature, conversationsServive.modelParams, (src, dst) => ({ ...dst, temperature: src }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
