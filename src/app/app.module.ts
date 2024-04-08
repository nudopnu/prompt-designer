import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { PromptPreviewComponent } from './components/prompt-preview/prompt-preview.component';
import { SearchableComponent } from './components/utils/searchable/searchable.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { SubmitDirective } from './directives/submit.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { MonacoModule } from './modules/monaco/monaco.module';
import { ZorroModule } from './modules/zorro/zorro.module';
import { HomeComponent } from './routes/home/home.component';
import { SnippetsComponent } from './components/snippets/snippets.component';
import { TabsComponent } from './components/editor/tabs/tabs.component';
import { MouseEventsDirective } from './directives/mouse-events.directive';
import { ConversationComponent } from './components/conversation/conversation.component';
import { MessageComponent } from './components/conversation/message/message.component';
import { ModelSettingsComponent } from './components/conversation/model-settings/model-settings.component';
import { HidableComponent } from './components/utils/hidable/hidable.component';
import { EditableLabelComponent } from './components/editable-label/editable-label.component';
import { HoverableComponent } from './components/utils/hoverable/hoverable.component';
import { ErrorHandlerService } from './services/error-handler.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditorComponent,
    PromptPreviewComponent,
    TooltipDirective,
    SnippetsComponent,
    SearchableComponent,
    SubmitDirective,
    AutofocusDirective,
    TabsComponent,
    MouseEventsDirective,
    ConversationComponent,
    MessageComponent,
    ModelSettingsComponent,
    HidableComponent,
    EditableLabelComponent,
    HoverableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ZorroModule,
    MonacoModule,
    HttpClientModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
