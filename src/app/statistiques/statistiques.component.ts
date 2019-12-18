import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { StatistiquesService } from '../services/statistiques.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {

  nbrRepParQuest=[];
  titreQuestions: string[]=[];
  nbrRep: number[]=[];
  private reponsesSubscription: Subscription;

  nbrRepParEmail=[];
  emails: string[]=[];
  nbrRepsParEmail: number[]=[];
  private reponsesEmailSubscription: Subscription;

  constructor(private statService: StatistiquesService) { }

  //*****************
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // Pie
  public pieChartLabels = this.titreQuestions;
  public pieChartData = this.nbrRep;
  public pieChartType = 'pie';
  public pieChartLegend = true;
  
  //----------------
  public doughnutChartLabels = this.emails;
  public doughnutChartData = this.nbrRepsParEmail;
  public doughnutChartType = 'doughnut';

  ngOnInit() {
    this.initDataForPipe();
    this.initDataForDoughnut();
    console.log(this.emails);
  }
  initDataForPipe(){
    this.statService.getReponsesParQuestionnaire();
    this.reponsesSubscription=this.statService.nbrRepParQuestSubject.subscribe(
      (rep: any[]) => {
        this.nbrRepParQuest=rep;
      }
    );
    this.statService.emitNbrRepParQuestSubject();
    this.nbrRepParQuest.forEach((element)=> {
      this.titreQuestions.push(element['titre']);
      this.nbrRep.push(element['nbrRep']);
    });
  }
  initDataForDoughnut(){
    this.statService.getReponsesParEmail();
    this.reponsesEmailSubscription=this.statService.nbrRepParEmailSubject.subscribe(
      (rep: any[]) => {
        this.nbrRepParEmail=rep;
      }
    );
    this.statService.emitNbrRepParEmailSubject();
    this.nbrRepParEmail.forEach((element) => {
      this.emails.push(element['email']);
      this.nbrRepsParEmail.push(element['nbrRep']);
    });
  }
  ngOnDestroy(){
    this.reponsesSubscription.unsubscribe();
    this.reponsesEmailSubscription.unsubscribe();
  }  
}
