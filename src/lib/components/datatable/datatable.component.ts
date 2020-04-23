/*
@author Sunmola Ayokunle
@version 1.0.1
@docs https://github.com/ayotycoon/docs/blob/master/notch-datatable.md
@lastModified 27 March 2020

*/

import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ayo-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  refreshing = false;
  cache = {
    checkBoxHeadId: ''
  };
  dateFields = {
    createdAt: true,
    updatedAt: true,
    createdDate: true,
    createdOn: true,
    endDate: true,
    paymentDueDate: true,
  };

  headHash = {};
  tableclass = 'a' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  paginate = 10;
  paginateIndex = 1;
  paginateArrayIndex = 1;
  totalAvailablePagination = 1;

  @Input() options;
  @Input() heads;
  @Input() bodyrows;
  staticBodyrows = [];
  @Input() dataChanged: Observable<any>;
  subs = [];
  @Output() feedback: EventEmitter<any> = new EventEmitter<any>(null);
  paginatedBodyrows = [];
  selectedrows = [];

  constructor() { }

  ngOnInit() {

    if (this.dataChanged) {
      this.subs.push(this.dataChanged.subscribe(changed => {
        if (changed) {
          this.refreshing = true;
          console.log('detected data change');

          setTimeout(() => {
            this.refreshing = false;
            this.staticBodyrows = this.bodyrows ? [...this.bodyrows] : [];
            this.paginateIndex = 1;
            this.paginateArrayIndex = 1;
            this.initializeTable();

          }, 1000);
        }
      }));
    }

    this.staticBodyrows = this.bodyrows ? [...this.bodyrows] : [];
    this.initializeTable();

  }

  headClicked = (headData, refElement?) => {
    switch (headData.key) {
      case 'checkbox':
        this.cache.checkBoxHeadId = refElement;
        const checked = (document.querySelector(
          '#' + refElement
        ) as HTMLInputElement).checked;


        document
          .querySelectorAll('.' + this.tableclass + '-checkbox')
          .forEach(
            (checkbox: HTMLInputElement) =>
              (checkbox.checked = !checked)
          );
        if (checked) {
          this.selectedrows = [];
        } else {
          this.selectedrows = [...this.paginatedBodyrows];
        }

        this.feedback.emit({ type: 'selectedrows', data: this.selectedrows });
        break;

      default:
        const sorted = this.headHash[headData.key].sorted;
        // @ts-ignore
        if (1 === 7) {
          this.headHash[headData.key] = { sorted: false };
          this.bodyrows = [...this.staticBodyrows];
          this.startPaginate();
          break;
        }
        this.bodyrows.sort((a: any, b: any) => {
          if (sorted) {
            this.headHash[headData.key] = { sorted: false };
            const temp = a;
            a = b;
            b = temp;
          } else {
            this.headHash[headData.key] = { sorted: true };
          }

          if (parseInt(a[headData.key]) && parseInt(b[headData.key])) {
            return a[headData.key] - b[headData.key];
          }

          const nameA = a[headData.key] ? (a[headData.key] + '').toUpperCase() : ''; // ignore upper and lowercase
          const nameB = b[headData.key] ? (b[headData.key] + '').toUpperCase() : ''; // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;


        });
        this.startPaginate();

        break;
    }
    const el = document.querySelector('#' + headData.key + '-icon');
    if (!el) {
      return;
    }
    if (this.headHash[headData.key].sorted) {
      el.innerHTML = `  <i class='fa  fa-angle-up'></i>`;
    } else {
      el.innerHTML = `  <i class='fa  fa-angle-down'></i>`;
    }


  }
  initializeTable = () => {
    this.heads.forEach(head => {
      this.headHash[head.key] = { sorted: false };


    });
    this.startPaginate(true);
  }
  startPaginate = (init?) => {
    if (!this.bodyrows) {
      return;
    }
    if (init) {
      this.totalAvailablePagination = Math.ceil(
        this.bodyrows.length / this.paginate
      ) || 1;
    }

    this.paginatedBodyrows = this.bodyrows.slice(
      this.paginateArrayIndex - 1,
      this.paginate + (this.paginateArrayIndex - 1)
    );

  }
  nextPaginate(n) {
    this.paginateIndex += (n);
    this.paginateArrayIndex += (n * this.paginate);
    this.startPaginate();
    this.resetCheckBox();
  }
  changePagination(n) {
    this.paginate = parseInt(n);
    this.paginateIndex = 1;
    this.paginateArrayIndex = 1;
    this.initializeTable();
  }
  search(searchInput) {
    this.bodyrows = this.staticBodyrows.filter(obj => {
      let match = false;
      for (const key of Object.keys(obj)) {
        if ((obj[key] + '').toLowerCase().match(searchInput.trim().toLowerCase())) {
          match = true;
          break;
        }
      }

      return match;
    });
    this.startPaginate(true);
  }
  resetCheckBox() {
    if (this.cache.checkBoxHeadId) {
      const refElement = this.cache.checkBoxHeadId;

      (document.querySelector(
        '#' + refElement
      ) as HTMLInputElement).checked = false;
    }
  }
  itemChecked(data, push?) {
    if (push) {
      this.selectedrows.push(data);
    } else {
      const firstkey = Object.keys(data)[0];
      this.selectedrows = this.selectedrows.filter(rdata => !(rdata[firstkey] === data[firstkey])
      );
    }
    this.feedback.emit({ type: 'selectedrows', data: this.selectedrows });
    this.resetCheckBox();


  }
  emitSingleAction(action, data) {
    this.feedback.emit({ type: 'singleaction', action, data });

  }
  emitBulkAction(action) {
    this.feedback.emit({ type: 'bulkactions', action, data: this.selectedrows });

  }
  min(a, b) {
    return Math.min(a, b);
  }


  emitViewActions(data, key) {

    if (key === 'checkbox' || key === 'action') {
      return;
    }
    ['View/Edit', 'View / Edit', 'View', 'Edit'].forEach(action => this.feedback.emit({ type: 'singleaction', action, data }));

  }
  OnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
