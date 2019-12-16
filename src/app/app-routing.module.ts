import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AuthComponent } from './auth/auth.component';
const routes: Routes = [
  { path: 'accueil', component: AccueilComponent},
  { path: 'questionnaire', component: ListQuestionsComponent },
  { path: 'statistiques', component: StatistiquesComponent },
  { path: 'connexion', component: AuthComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: '', component: AppComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
