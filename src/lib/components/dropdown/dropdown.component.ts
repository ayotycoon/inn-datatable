import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'ayo-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit, OnDestroy,AfterViewInit {
  // @ts-ignore
  @ViewChild('Dropdown') myDivElementRef: ElementRef;
  @Input() togglePosition: any;
  toggleEl: HTMLDivElement;
  parentToggleEl: HTMLDivElement;
  clicked = false;
  clickedFunRef: any;
  parentFunRef: any;
  canClickOutside = false;
  canClickOutsideSetTimeoutRef: any;

  constructor() { }

  ngOnInit() {





  }



  toggleClicked() {
    this.clicked = !this.clicked;


 
    function isDescendant(parent: HTMLElement, child: HTMLElement) {
      let node = child.parentNode;
      while (node != null) {
        if (node == parent) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    }
    if (this.clicked) {
      this.toggleEl.style.display = 'block';
      this.myDivElementRef.nativeElement.style.zIndex = '6';
      if (this.canClickOutsideSetTimeoutRef){
        clearTimeout(this.canClickOutsideSetTimeoutRef)
      }

      this.canClickOutsideSetTimeoutRef = setTimeout(() => {
        this.canClickOutside = true;
      }, 100);
        this.clickedFunRef = window.addEventListener('click', (e: any) => {

         
          if (!isDescendant(this.toggleEl, e.target) && this.canClickOutside) {

            this.toggleClicked()
          }
        })

   
    } else {
      this.canClickOutside = false;
      this.toggleEl.style.display = 'none';
      this.myDivElementRef.nativeElement.style.zIndex = '2';
    }
  }
  ngAfterViewInit(){
    this.toggleEl = this.myDivElementRef.nativeElement.querySelector('[toggle]');


    this.toggleEl.style.display = 'none';
    this.toggleEl.style.position = 'absolute';
    if(this.togglePosition){
      this.toggleEl.style[this.togglePosition['position']] = this.togglePosition['value'];
    }
 

  }
  ngOnDestroy() {
    if (this.clickedFunRef) {
      window.removeEventListener('click', this.clickedFunRef)
    }
 
  }

}
