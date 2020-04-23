import { Observable } from 'rxjs';
import { OnInit, EventEmitter } from '@angular/core';
export declare class DatatableComponent implements OnInit {
    refreshing: boolean;
    cache: {
        checkBoxHeadId: string;
    };
    dateFields: {
        createdAt: boolean;
        updatedAt: boolean;
        createdDate: boolean;
        createdOn: boolean;
        endDate: boolean;
        paymentDueDate: boolean;
    };
    headHash: {};
    tableclass: string;
    paginate: number;
    paginateIndex: number;
    paginateArrayIndex: number;
    totalAvailablePagination: number;
    options: any;
    heads: any;
    bodyrows: any;
    staticBodyrows: any[];
    dataChanged: Observable<any>;
    subs: any[];
    feedback: EventEmitter<any>;
    paginatedBodyrows: any[];
    selectedrows: any[];
    constructor();
    ngOnInit(): void;
    headClicked: (headData: any, refElement?: any) => void;
    initializeTable: () => void;
    startPaginate: (init?: any) => void;
    nextPaginate(n: any): void;
    changePagination(n: any): void;
    search(searchInput: any): void;
    resetCheckBox(): void;
    itemChecked(data: any, push?: any): void;
    emitSingleAction(action: any, data: any): void;
    emitBulkAction(action: any): void;
    min(a: any, b: any): number;
    emitViewActions(data: any, key: any): void;
    OnDestroy(): void;
}
