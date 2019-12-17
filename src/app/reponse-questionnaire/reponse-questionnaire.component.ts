import { Component, OnInit } from '@angular/core';
import { GestionQuestionnaireService } from '../services/gestion-questionnaire.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reponse-questionnaire',
  templateUrl: './reponse-questionnaire.component.html',
  styleUrls: ['./reponse-questionnaire.component.css']
})
export class ReponseQuestionnaireComponent implements OnInit {
  
  private id;
  constructor(private gestionService: GestionQuestionnaireService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];  
  }
  getQuestionnaireById()
  {
    return this.gestionService.getQuestionnaireById(this.id);
  }
}
