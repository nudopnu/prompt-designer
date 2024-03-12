import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { PromptPreviewComponent } from './components/prompt-preview/prompt-preview.component';
import { SearchableComponent } from './components/searchable/searchable.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { SubmitDirective } from './directives/submit.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { MonacoModule } from './modules/monaco/monaco.module';
import { ZorroModule } from './modules/zorro/zorro.module';
import { HomeComponent } from './routes/home/home.component';
import { SnippetsComponent } from './snippets/snippets.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { MouseEventsDirective } from './directives/mouse-events.directive';

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
    MouseEventsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ZorroModule,
    MonacoModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
