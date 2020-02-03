import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { ChartOptions } from 'chart.js';
import { StatistiquesService } from '../services/statistiques.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private statService: StatistiquesService,
              private route: ActivatedRoute) { }
  allColors= ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','rgba(186,175,34,0.3)',
           'rgba(242,19,19,0.3)', 'rgba(135, 4, 4,0.3)', 'rgba(173, 221, 183,0.3)','rgba(30, 137, 191,0.3)',
           'rgba(25, 26, 33,0.3)', 'rgba(124, 88, 102,0.3)', 'rgba(193, 152, 38,0.3)','rgba(160, 42, 183,0.3)',
           'rgba(86, 0, 33,0.3)', 'rgba(89, 122, 99,0.3)', 'rgba(86, 89, 65,0.3)','rgba(98, 112, 0,0.3)']
  colorsPie = [
    {
      backgroundColor: []
    }
  ];
  colorsDoughnut = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','rgba(186,175,34,0.3)'],
    },
  ];
  //*****************
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
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
  }
  initDataForPipe(){
    let backGroundPie=[];
    this.statService.getReponsesParQuestionnaire();
    this.reponsesSubscription=this.statService.nbrRepParQuestSubject.subscribe(
      (rep: any[]) => {
        this.nbrRepParQuest=rep;
      }
    );
    this.statService.emitNbrRepParQuestSubject();
    let i=0;
    this.nbrRepParQuest.forEach((element)=> {
      this.titreQuestions.push(element['titre']);
      this.nbrRep.push(element['nbrRep']);
      backGroundPie.push(this.allColors[i]);
      i++;
    });
    this.colorsPie[0].backgroundColor=backGroundPie;
  }

  initDataForDoughnut(){
    /*this.route.data.subscribe((data) => {
      console.log(data['message']);
      let backGroundDoughnut=[];
      let j=0;
      this.nbrRepParEmail.forEach((element) => {
        this.emails.push(element['email']);
        this.nbrRepsParEmail.push(element['nbrRep']);
        backGroundDoughnut.push(this.allColors[j]);
        j++;
      });
      this.colorsDoughnut[0].backgroundColor=backGroundDoughnut;
    } );*/
    //console.log(this.route.data['_value'].message);
    this.statService.getReponsesParEmail();
    this.reponsesEmailSubscription=this.statService.nbrRepParEmailSubject.subscribe(
      (rep: any[]) => {
        this.nbrRepParEmail=rep;
        console.log(this.nbrRepParEmail);
      }
    );
    this.statService.emitNbrRepParEmailSubject();
    let backGroundDoughnut=[];
      let j=0;
      this.nbrRepParEmail.forEach((element) => {
        this.emails.push(element['email']);
        this.nbrRepsParEmail.push(element['nbrRep']);
        backGroundDoughnut.push(this.allColors[j]);
        j++;
      });
      this.colorsDoughnut[0].backgroundColor=backGroundDoughnut;
  }
  ngOnDestroy(){
    this.reponsesSubscription.unsubscribe();
    this.reponsesEmailSubscription.unsubscribe();
  }  
}
