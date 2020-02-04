import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService implements OnInit{

  nbrRepParQuest=[];
  
  nbrRepParEmail=[];

  test1=[
    {
      titre: "quest1",
      nbrRep: 5
    },
    {
      titre: "quest2",
      nbrRep: 15
    },
    {
      titre:"quest3",
      nbrRep: 25
    },
    {
      titre:"quest4",
      nbrRep: 66
    }
  ]

  test2=[
    {
      email: "marwenhanzouli@gmail.com",
      nbrRep: 10
    },
    {
      email: "arfaouinoureddine@gmail.com",
      nbrRep: 14
    },
    {
      email:"pap@hotmail.fr",
      nbrRep: 9
    },
    {
      email:"messi@yahoo.com",
      nbrRep: 17
    }
  ]

  constructor(private httpClient: HttpClient) { }

  ngOnInit(){
  }
  getReponsesParQuestionnaire(): Observable<any>{
    return this.httpClient.get<any[]>('http://127.0.0.1:3000/St/question');
    /*.subscribe(
      (reponse) => {
        this.nbrRepParQuest=reponse;
        this.emitNbrRepParQuestSubject();
        //console.log(reponse);
      },
      (error) => {
        console.log(error);
      }
    );
    //this.nbrRepParQuest=this.test1;*/
  }

  getReponsesParEmail(): Observable<any[]>{
    return this.httpClient.get<any[]>('http://127.0.0.1:3000/St/Person');
    /*.subscribe(
      (reponse) => {
        this.nbrRepParEmail=reponse;
        this.emitNbrRepParEmailSubject();
        //console.log(reponse);
      },
      (error) => {
        console.log(error);
      }
    );
    //this.nbrRepParEmail=this.test2;*/
  }
  getStatistiques(): Observable<any[]>{
    return this.httpClient.get<any[]>('http://127.0.0.1:3000/St');
  }
}
