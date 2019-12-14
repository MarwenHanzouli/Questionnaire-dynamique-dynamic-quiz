import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthComponent } from './auth/auth.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { QuestionComponent } from './question/question.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';

@NgModule({
  declarations: [
    AppComponent,
    FourOhFourComponent,
    AuthComponent,
    MenuComponent,
    HeaderComponent,
    QuestionComponent,
    ListQuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
