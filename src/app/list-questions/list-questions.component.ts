import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GestionQuestionnaireService } from '../services/gestion-questionnaire.service';
import { Questionnaire } from '../models/Questionnaire.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {

  questForm: FormGroup;
  succes: boolean;
  error:boolean;
  constructor(private formBuilder: FormBuilder,
              private gestionService: GestionQuestionnaireService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();
    this.succes=false;
    this.error=false;
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
  nbrQuestionValide(){
    if (this.getQcm().length==0 && this.getQuestionsSimples().length==0)
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  onRefresh(){
    this.questForm.get('titre').setValue('');
    (<FormArray>this.questForm.get(['qcm'])).controls=[];
    (<FormArray>this.questForm.get(['questionsSimples'])).controls=[];
    this.succes=false;
  }
  async onSubmit(){
    const formValue=this.questForm.value;
    const id=this.gestionService.getQuestionnaires().length+1;
    const quest=new Questionnaire(id,formValue['titre'].trim(),formValue['questionsSimples'],formValue['qcm']);
    //console.log(quest);
    this.gestionService.ajouterQuestionnaire(quest).subscribe((data)=>{
      if(data['sucees']===false)
      {
        this.toastr.warning("Oups! Le questionnaire n'a pas été ajouté, ce titre existe déjà", "Notification!");
        this.error=true;
        this.succes=false;
      }
      else{
        //console.log(JSON.stringify(data)+" marweeeeeeeeeeeeeeeeen");
        this.gestionService.questionnaires.push(quest);
        this.gestionService.emitQuestSubject();
        this.toastr.success('Le questionnaire a été ajouté avec succès', "Notification!");
        this.succes=true;
        this.error=false;
        //this.onRefresh();
        this.router.navigate(['/questionnaire']);
      }
    });
    
  }
}
