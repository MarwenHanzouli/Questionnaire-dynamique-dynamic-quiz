import { Injectable } from '@angular/core';
import { Reponse } from '../models/Reponse.model';
import { HttpClient } from '@angular/common/http';
import { GestionQuestionnaireService } from './gestion-questionnaire.service';
import { Questionnaire } from '../models/Questionnaire.model';

@Injectable({
  providedIn: 'root'
})
export class GestionReponseService {

  constructor(private httpClient: HttpClient,
              private gestionQuest: GestionQuestionnaireService) { }

  ajouterReponse(rep, questionnaire: Questionnaire){
    let reponsesSimples=[],qcm=[];
    let i,j:number;
    for(i=0;i<questionnaire.questionsSimples.length;i++)
    {
      const reponseSimple={ 
                            "question": questionnaire.questionsSimples[i]['titreQuestionSimple'],
                            "reponse": rep['reponsesSimples'][i]['reponseSimple']
                          }
      reponsesSimples.push(reponseSimple);
    }
    for(j=0;j<questionnaire.qcm.length;j++)
    {
      const reponseSimple={ 
                            "question": questionnaire.qcm[j]['titreQuestion'],
                            "reponse": rep['qcm'][j]['reponseOption']
                          }
      qcm.push(reponseSimple);
    }
    const reponse=new Reponse(rep['email'],1,questionnaire.titre,reponsesSimples,qcm);
    console.log(JSON.stringify(reponse));
  }
}
