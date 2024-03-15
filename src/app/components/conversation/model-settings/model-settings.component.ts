import { Component, OnDestroy, computed, effect, model, signal } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { ConversationsService } from '../../../services/conversations.service';
import { connectOnChange } from '../../../lib/utils';
import { toObservable } from "@angular/core/rxjs-interop";
import { TemplateLiteralElement } from '@angular/compiler';

@Component({
  selector: 'pro-model-settings',
  templateUrl: './model-settings.component.html',
  styleUrl: './model-settings.component.scss'
})
export class ModelSettingsComponent implements OnDestroy {

  private _isLoading = signal(true);
  isLoading = computed(() => this._isLoading() && this.conversationsService.isLoading());

  host = this.conversationsService.host;
  temperature = model<number>();
  chatName = model<string>();
  collectionName = model<string>();
  model = model<string>();

  models = this.conversationsService.models;

  private subscriptions: Subscription[] = [];

  constructor(private conversationsService: ConversationsService) {
    this.subscriptions = [
      connectOnChange(conversationsService.currentChatSettings, this.model, (src, dst) => {
        if (!src) return dst;
        return src.model_params.model;
      }),
      connectOnChange(conversationsService.currentChatSettings, this.temperature, (src, dst) => {
        if (!src) return dst;
        return src.model_params.temperature;
      }),
      connectOnChange(conversationsService.currentChatSettings, this.collectionName, (src, dst) => {
        if (!src) return dst;
        return src.collection_name;
      }),
      connectOnChange(conversationsService.currentChatSettings, this.chatName, (src, dst) => {
        if (!src) return dst;
        return src.name;
      }),

      toObservable(this.model)
        .subscribe(model => conversationsService
          .updateChatSettings((settings) => {
            if (!settings) return settings;
            return {
              ...settings,
              model_params: {
                ...settings.model_params,
                model,
              }
            }
          })
        ),

      toObservable(this.temperature)
        .subscribe(temperature => conversationsService
          .updateChatSettings(settings => {
            if (!settings || !temperature) return settings;
            return {
              ...settings,
              model_params: {
                ...settings.model_params,
                temperature,
              }
            }
          })
        ),

      toObservable(this.chatName)
        .subscribe(name => conversationsService
          .updateChatSettings(settings => {
            if (!settings || !name) return settings;
            return {
              ...settings,
              name,
            }
          })
        ),

      toObservable(this.collectionName)
        .subscribe(collection_name => conversationsService
          .updateChatSettings(settings => {
            if (!settings || !collection_name) return settings;
            return {
              ...settings,
              collection_name,
            }
          })
        ),

    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onClickSyncHost() {
    this.conversationsService.fetchModels();
    this.conversationsService.fetchChats();
  }

}
