import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { StatistiquesService } from './services/statistiques.service';
@NgModule()
@Injectable()
export class StatResolver implements Resolve<any> {
  constructor(private statService: StatistiquesService) {}

  resolve() {
    return this.statService.getReponsesParEmail();
  }
}