import { Component, OnDestroy, Signal, WritableSignal, computed, model } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ApiService } from '../../../services/api.service';
import { ConversationsService } from '../../../services/conversations.service';
import { Subscription } from 'rxjs';

function connectOnChange<T, U>(sourceSignal: Signal<T>, destinationSignal: WritableSignal<U>, update: (src: T, dst: U) => U) {
  return toObservable(sourceSignal)
    .subscribe(sourceValue => {
      destinationSignal.update(destinationValue => update(sourceValue, destinationValue));
    });
}

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
