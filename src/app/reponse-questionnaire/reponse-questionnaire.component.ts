import { Component, OnInit } from '@angular/core';
import { GestionQuestionnaireService } from '../services/gestion-questionnaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Questionnaire } from '../models/Questionnaire.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-reponse-questionnaire',
  templateUrl: './reponse-questionnaire.component.html',
  styleUrls: ['./reponse-questionnaire.component.css']
})
export class ReponseQuestionnaireComponent implements OnInit {
  
  private id;
  questionnaire: Questionnaire;
  repForm: FormGroup;
  constructor(private gestionService: GestionQuestionnaireService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router:Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];  
    this.questionnaire=this.gestionService.getQuestionnaireById(this.id);
    this.initForm();
    this.initReponsesSimples();
    this.initReponsesOcm();
  }
  initForm(){
    this.repForm= this.formBuilder.group({
      reponsesSimples: this.formBuilder.array([]),
      qcm: this.formBuilder.array([])
    });
  }
  initReponse(){
    return this.formBuilder.group({
      reponseSimple: ['',Validators.required]
    });
  }
  initQCM()
  {
    return this.formBuilder.group({
      options: this.formBuilder.array([])
    })
  }
  initOptions(option){
    return this.formBuilder.group({
      reponseOption: [option,Validators.required]
    })
  }

  getReponsesSimples(): FormArray {
    return this.repForm.get('reponsesSimples') as FormArray;
  }
  getReponsesQcm(): FormArray {
    return this.repForm.get('qcm') as FormArray;
  }
  initReponsesSimples(){
    this.questionnaire.questionsSimples.forEach((q)=>{
      this.getReponsesSimples().push(this.initReponse());
    })
  }
  initReponsesQcm(){
    this.questionnaire.questionsSimples.forEach((q)=>{
      this.getReponsesQcm().push(this.initReponse());
    })
  }

  getOptions(form) {
    return form.controls.options.controls;
  }

  getQcm(): FormArray {
    return this.repForm.get('qcm') as FormArray;
  }
  ajouterQcm() {
    this.getQcm().push(this.initQCM());
  }

  initReponsesOcm() {
    let i:number;
    for(i=0;i<this.questionnaire.qcm.length;i++)
    {
      this.ajouterQcm();
      const control = <FormArray>this.repForm.get(['qcm',i,'options']);
      let j:number;
      for(j=0;j<this.questionnaire.qcm[i]['options'].length;j++)
      {
        control.push(this.initOptions(this.questionnaire.qcm[i]['options'][j]['titreOption']));
      }
    }
  }

  myOptions() {
    return this.repForm.get(['qcm']);
  }
  // Envoyer le formulaire
  onRefresh(){
    
  }
  onSubmit(form){
    const formValue=this.repForm.value;
    //const id=this.gestionService.getQuestionnaires().length+1;
    //const quest=new Questionnaire(id,formValue['titre'],formValue['questionsSimples'],formValue['qcm']);
    console.log(JSON.stringify(formValue));
    console.log(form.controls);
    //this.gestionService.ajouterQuestionnaire(quest);
    //this.onRefresh();
    //this.router.navigate(['/questionnaire']);
  }
}
