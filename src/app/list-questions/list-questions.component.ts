import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GestionQuestionnaireService } from '../services/gestion-questionnaire.service';
import { Questionnaire } from '../models/Questionnaire.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {

  questForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private gestionService: GestionQuestionnaireService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  //Initialisation des formulaires
  initForm()
  {
    this.questForm= this.formBuilder.group({
      titre: ['',Validators.required],
      questionsSimples: this.formBuilder.array([this.initQuestion()]),
      qcm: this.formBuilder.array([this.initQCM()])
    });
  }
  initQuestion(){
    return this.formBuilder.group({
      titreQuestionSimple: ['',Validators.required]
    });
  }
  initQCM()
  {
    return this.formBuilder.group({
      titreQuestion: ['',Validators.required],
      options: this.formBuilder.array([this.initOptions()])
    })
  }
  initOptions(){
    return this.formBuilder.group({
      titreOption: ['',Validators.required]
    })
  }

  // Gestion des QCMs
  getQcm(): FormArray {
    return this.questForm.get('qcm') as FormArray;
  }
  getOptions(form) {
    return form.controls.options.controls;
  }

  ajouterQcm() {
    this.getQcm().push(this.initQCM());
  }

  ajouterOption(j) {
    const control = <FormArray>this.questForm.get(['qcm',j,'options']);
    control.push(this.initOptions());
  }

  supprimerQuestion(j){
    this.getQcm().removeAt(j);
  }

  supprimerOption(j,k){
    const control = <FormArray>this.questForm.get(['qcm',j,'options']);
    control.removeAt(k);
  }

  supprimerToutesOptions(j){
    const control =  <FormArray>this.questForm.get(['qcm',j,'options']);
    control.removeAt(0);
    control.controls = [];
  }

  //Gestion des questions simples
  getQuestionsSimples(): FormArray {
    return this.questForm.get('questionsSimples') as FormArray;
  }
  onAjouterQuestionSimple()
  {
    this.getQuestionsSimples().push(this.initQuestion()); 
  }
  onSupprimerQuestionSimple(index){
    this.getQuestionsSimples().removeAt(index);
  }

  // Envoyer le formulaire
  onRefresh(){
    this.questForm.get('titre').setValue('');
    (<FormArray>this.questForm.get(['qcm'])).controls=[];
    (<FormArray>this.questForm.get(['questionsSimples'])).controls=[];
  }
  onSubmit(){
    const formValue=this.questForm.value;
    const quest=new Questionnaire(formValue['titre'],formValue['questionsSimples'],formValue['qcm']);
    console.log(quest);
    this.gestionService.ajouterQuestionnaire(quest);
    this.router.navigate(['/questionnaire']);
  }
}
