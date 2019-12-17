import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appEmoji]'
})
export class EmojiDirective implements OnInit{
  @Input("appEmoji") emoji:string;
  constructor(private element:ElementRef) { }
  ngOnInit(){
    this.element.nativeElement.textContent += this.emoji;
  }
}
