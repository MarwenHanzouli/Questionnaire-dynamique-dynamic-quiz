import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthComponent } from './auth/auth.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HeaderComponent } from './header/header.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { GestionQuestionnaireService } from './services/gestion-questionnaire.service';
import { HttpClientModule } from '@angular/common/http';
import { ReponseQuestionnaireComponent } from './reponse-questionnaire/reponse-questionnaire.component';
import { EmojiDirective } from './emoji.directive';
import { GestionReponseService } from './services/gestion-reponse.service';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    FourOhFourComponent,
    AuthComponent,
    AccueilComponent,
    HeaderComponent,
    ListQuestionsComponent,
    StatistiquesComponent,
    InscriptionComponent,
    ReponseQuestionnaireComponent,
    EmojiDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    GestionQuestionnaireService,
    GestionReponseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
