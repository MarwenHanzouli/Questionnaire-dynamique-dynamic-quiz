import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuestionsComponent } from './list-questions.component';

describe('ListQuestionsComponent', () => {
  let component: ListQuestionsComponent;
  let fixture: ComponentFixture<ListQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
