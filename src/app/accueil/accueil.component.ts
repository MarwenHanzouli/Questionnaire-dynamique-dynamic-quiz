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
  private questionnairesAfficher: Questionnaire[]=[];
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
    this.questionnairesAfficher=this.questionnaires;
  }
  getQuestionnaires()
  {
    return this.questionnaires;
  }
  getQuestionnairesAfficher()
  {
    return this.questionnairesAfficher;
  }
  onChercher(form: NgForm ){

  }
  onKeyUp(event: any){
    console.log(event.keyCode);
    if(event.keyCode==8 || event.keyCode==46)
    {
      this.gestionService.getQuestionnairesByTag(event.target.value.toString());
      this.questionnaireSubscription=this.gestionService.questSubject.subscribe(
        (quests: Questionnaire[]) => {
          this.questionnairesAfficher=quests;
        }
      );
    }
    this.gestionService.getQuestionnairesByTag(event.target.value.toString());
    this.questionnaireSubscription=this.gestionService.questSubject.subscribe(
      (quests: Questionnaire[]) => {
        this.questionnairesAfficher=quests;
      }
    );
  }
  ngOnDestroy(){
    this.questionnaireSubscription.unsubscribe();
  }  
}
