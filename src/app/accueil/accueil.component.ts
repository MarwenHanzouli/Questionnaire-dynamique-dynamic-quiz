import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-menu',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  questForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.questForm=this.formBuilder.group({
      titre:['', Validators.required],
      simples: this.formBuilder.array([]),
      QCM: this.formBuilder.array([])
    });
  }

  onSubmitForm(){
    const formValue=this.questForm.value;
    console.log(formValue['titre']);
    console.log(formValue['simples']);
    console.log(formValue['QCM']);
  }

  getQuestionsSimples(): FormArray {
    return this.questForm.get('simples') as FormArray;
  }
  onAjouterQuestionSimple()
  {
    const control=this.formBuilder.control(null,Validators.required);
    this.getQuestionsSimples().push(control); 
  }
  onSupprimerQuestionSimple(index){
    this.getQuestionsSimples().removeAt(index);
  }

  getQCM(): FormArray {
    return this.questForm.get('QCM') as FormArray;
  }
  onAjouterQCM()
  {
    const control=this.formBuilder.control(null,Validators.required);
    this.getQCM().push(control);
  }
  onSupprimerQCM(index){
    this.getQCM().removeAt(index);
  }
}
