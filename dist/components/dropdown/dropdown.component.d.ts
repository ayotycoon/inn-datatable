import { OnInit, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
export declare class DropdownComponent implements OnInit, OnDestroy, AfterViewInit {
    myDivElementRef: ElementRef;
    togglePosition: any;
    toggleEl: HTMLDivElement;
    parentToggleEl: HTMLDivElement;
    clicked: boolean;
    clickedFunRef: any;
    parentFunRef: any;
    canClickOutside: boolean;
    canClickOutsideSetTimeoutRef: any;
    constructor();
    ngOnInit(): void;
    toggleClicked(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
