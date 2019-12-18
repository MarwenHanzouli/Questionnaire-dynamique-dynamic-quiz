import { Injectable } from '@angular/core';
import { Questionnaire } from '../models/Questionnaire.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GestionQuestionnaireService {
  private questionnaires: Questionnaire[]=[];
  questSubject= new Subject<Questionnaire[]>();
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  emitQuestSubject(){
    this.questSubject.next(this.questionnaires.slice());
  }
  getQuestionnaires(){
    return this.questionnaires;
  }
  ajouterQuestionnaire(ques: Questionnaire){
    this.questionnaires.push(ques);
    this.emitQuestSubject();
    this.httpClient.post('http://127.0.0.1:3000/qte', ques, {headers: this.headers})
    .subscribe(
     (data) => {
      console.log(data);
      
     },
     (error) => {
       console.log('Erreur : '+ error);
     }
     );
  }

  getAllQuestionnairesFromServer(){
    this.httpClient.get<any[]>('http://127.0.0.1:3000/allQte')
    .subscribe(
      (reponse) => {
        this.questionnaires=reponse;
        this.emitQuestSubject();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getQuestionnairesByTitre(titre: string){
    this.questionnaires=this.questionnaires.filter(
      quest => quest.titre.toLowerCase().indexOf(titre.toLowerCase())!=-1
      );
    this.emitQuestSubject();
    let params = new HttpParams().set('titre', titre);
    this.httpClient.get('http://127.0.0.1:3000/Qte', { params: params })
    .subscribe(
      (reponse) => {
        console.log(reponse);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getQuestionnaireById(id){
    return this.questionnaires.find(
      quest => quest.id==id
      );
  }
}
