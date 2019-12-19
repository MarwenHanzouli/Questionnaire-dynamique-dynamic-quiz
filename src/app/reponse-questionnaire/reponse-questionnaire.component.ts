import { Component, OnInit } from '@angular/core';
import { GestionQuestionnaireService } from '../services/gestion-questionnaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Questionnaire } from '../models/Questionnaire.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { GestionReponseService } from '../services/gestion-reponse.service';

@Component({
  selector: 'app-reponse-questionnaire',
  templateUrl: './reponse-questionnaire.component.html',
  styleUrls: ['./reponse-questionnaire.component.css']
})
export class ReponseQuestionnaireComponent implements OnInit {
  
  private id;
  questionnaire: Questionnaire;
  repForm: FormGroup;
  reponsesQcm=[];
  constructor(private gestionService: GestionQuestionnaireService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router:Router,
    private gestionReponse: GestionReponseService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];  
    this.questionnaire=this.gestionService.getQuestionnaireById(this.id);
    this.initForm();
    this.initReponsesSimples();
    this.initReponsesOcm();
  }
  initForm(){
    this.repForm= this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
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
      this.reponsesQcm.push("-");
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
  testOptionsSelected(){
    if(this.reponsesQcm.indexOf("-")===-1)
    {
      return true;
    }
    else{
      return false;
    }
  }
  myEvent(j,event){
    console.log("qcm n°"+j+": "+event);
    this.reponsesQcm[j]=event;
  }
  onSubmit(form){
    const formValue=this.repForm.value;
    console.log(this.reponsesQcm);
    //const id=this.gestionService.getQuestionnaires().length+1;
    //const quest=new Questionnaire(id,formValue['titre'],formValue['questionsSimples'],formValue['qcm']);
    //const reponse=new Reponse(formValue['email'],1,formValue['titre'],formValue['reponsesSimples'],formValue['qcm'])
    console.log('form:'+JSON.stringify(formValue));
    //console.log(form.controls);
    this.gestionReponse.ajouterReponse(formValue,this.questionnaire,this.reponsesQcm);
    //this.onRefresh();
    //this.router.navigate(['/questionnaire']);
  }
}
