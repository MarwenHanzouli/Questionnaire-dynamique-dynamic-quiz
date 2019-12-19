import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  private type:string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.type = this.route.snapshot.params['type'];
  }

}
