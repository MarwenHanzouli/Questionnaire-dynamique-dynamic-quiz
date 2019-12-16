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
  constructor(private gestionService: GestionQuestionnaireService) { }

  ngOnInit() {
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
    console.log(event.target.value.toString());
    this.gestionService.getQuestionnairesByTag(event.target.value.toString());
    this.questionnaireSubscription=this.gestionService.questSubject.subscribe(
      (quests: Questionnaire[]) => {
        this.questionnaires=quests;
      }
    );
    this.gestionService.emitQuestSubject();
  }
  ngOnDestroy(){
    this.questionnaireSubscription.unsubscribe();
  }  
}
