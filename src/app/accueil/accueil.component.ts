import { FormGroup, FormBuilder, Validators, FormArray, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GestionQuestionnaireService } from '../services/gestion-questionnaire.service';
import { Questionnaire } from '../models/Questionnaire.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, OnDestroy {
  private questionnaires: Questionnaire[]=[];
  private questionnaireSubscription: Subscription;
  valeurDeRecherche: string;

  constructor(private gestionService: GestionQuestionnaireService) { }

  ngOnInit() {
    this.initTableauQuestionnaires();
  }
  initTableauQuestionnaires(){
    this.gestionService.getAllQuestionnairesFromServer();
    this.questionnaireSubscription=this.gestionService.questSubject.subscribe(
      (quests: Questionnaire[]) => {
        this.questionnaires=quests;
      }
    );
    this.gestionService.emitQuestSubject();
  }
  getQuestionnaires()
  {
    return this.questionnaires;
  }
  onChercher(form: NgForm ){

  }
  onKeyUp(event: any){
    this.questionnaires=this.gestionService.getQuestionnairesByTitre(this.valeurDeRecherche);
  }
  ngOnDestroy(){
    this.questionnaireSubscription.unsubscribe();
  }  
}
