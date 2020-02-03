import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { StatistiquesService } from './services/statistiques.service';
@NgModule()
@Injectable({ providedIn: 'root' })
export class StatResolver implements Resolve<any> {
  constructor(private statService: StatistiquesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.statService.getReponsesParEmail();
  }
}