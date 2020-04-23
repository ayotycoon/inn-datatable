/*
@author Sunmola Ayokunle
@version 1.0.1
@docs https://github.com/ayotycoon/docs/blob/master/notch-datatable.md
@lastModified 27 March 2020

*/
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var DatatableComponent = /** @class */ (function () {
    function DatatableComponent() {
        var _this = this;
        this.refreshing = false;
        this.cache = {
            checkBoxHeadId: ''
        };
        this.dateFields = {
            createdAt: true,
            updatedAt: true,
            createdDate: true,
            createdOn: true,
            endDate: true,
            paymentDueDate: true,
        };
        this.headHash = {};
        this.tableclass = 'a' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.paginate = 10;
        this.paginateIndex = 1;
        this.paginateArrayIndex = 1;
        this.totalAvailablePagination = 1;
        this.staticBodyrows = [];
        this.subs = [];
        this.feedback = new EventEmitter(null);
        this.paginatedBodyrows = [];
        this.selectedrows = [];
        this.headClicked = function (headData, refElement) {
            switch (headData.key) {
                case 'checkbox':
                    _this.cache.checkBoxHeadId = refElement;
                    var checked_1 = document.querySelector('#' + refElement).checked;
                    document
                        .querySelectorAll('.' + _this.tableclass + '-checkbox')
                        .forEach(function (checkbox) {
                        return (checkbox.checked = !checked_1);
                    });
                    if (checked_1) {
                        _this.selectedrows = [];
                    }
                    else {
                        _this.selectedrows = tslib_1.__spread(_this.paginatedBodyrows);
                    }
                    _this.feedback.emit({ type: 'selectedrows', data: _this.selectedrows });
                    break;
                default:
                    var sorted_1 = _this.headHash[headData.key].sorted;
                    // @ts-ignore
                    if (1 === 7) {
                        _this.headHash[headData.key] = { sorted: false };
                        _this.bodyrows = tslib_1.__spread(_this.staticBodyrows);
                        _this.startPaginate();
                        break;
                    }
                    _this.bodyrows.sort(function (a, b) {
                        if (sorted_1) {
                            _this.headHash[headData.key] = { sorted: false };
                            var temp = a;
                            a = b;
                            b = temp;
                        }
                        else {
                            _this.headHash[headData.key] = { sorted: true };
                        }
                        if (parseInt(a[headData.key]) && parseInt(b[headData.key])) {
                            return a[headData.key] - b[headData.key];
                        }
                        var nameA = a[headData.key] ? (a[headData.key] + '').toUpperCase() : ''; // ignore upper and lowercase
                        var nameB = b[headData.key] ? (b[headData.key] + '').toUpperCase() : ''; // ignore upper and lowercase
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        // names must be equal
                        return 0;
                    });
                    _this.startPaginate();
                    break;
            }
            var el = document.querySelector('#' + headData.key + '-icon');
            if (!el) {
                return;
            }
            if (_this.headHash[headData.key].sorted) {
                el.innerHTML = "  <i class='fa  fa-angle-up'></i>";
            }
            else {
                el.innerHTML = "  <i class='fa  fa-angle-down'></i>";
            }
        };
        this.initializeTable = function () {
            _this.heads.forEach(function (head) {
                _this.headHash[head.key] = { sorted: false };
            });
            _this.startPaginate(true);
        };
        this.startPaginate = function (init) {
            if (!_this.bodyrows) {
                return;
            }
            if (init) {
                _this.totalAvailablePagination = Math.ceil(_this.bodyrows.length / _this.paginate) || 1;
            }
            _this.paginatedBodyrows = _this.bodyrows.slice(_this.paginateArrayIndex - 1, _this.paginate + (_this.paginateArrayIndex - 1));
        };
    }
    DatatableComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.dataChanged) {
            this.subs.push(this.dataChanged.subscribe(function (changed) {
                if (changed) {
                    _this.refreshing = true;
                    console.log('detected data change');
                    setTimeout(function () {
                        _this.refreshing = false;
                        _this.staticBodyrows = _this.bodyrows ? tslib_1.__spread(_this.bodyrows) : [];
                        _this.paginateIndex = 1;
                        _this.paginateArrayIndex = 1;
                        _this.initializeTable();
                    }, 1000);
                }
            }));
        }
        this.staticBodyrows = this.bodyrows ? tslib_1.__spread(this.bodyrows) : [];
        this.initializeTable();
    };
    DatatableComponent.prototype.nextPaginate = function (n) {
        this.paginateIndex += (n);
        this.paginateArrayIndex += (n * this.paginate);
        this.startPaginate();
        this.resetCheckBox();
    };
    DatatableComponent.prototype.changePagination = function (n) {
        this.paginate = parseInt(n);
        this.paginateIndex = 1;
        this.paginateArrayIndex = 1;
        this.initializeTable();
    };
    DatatableComponent.prototype.search = function (searchInput) {
        this.bodyrows = this.staticBodyrows.filter(function (obj) {
            var e_1, _a;
            var match = false;
            try {
                for (var _b = tslib_1.__values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    if ((obj[key] + '').toLowerCase().match(searchInput.trim().toLowerCase())) {
                        match = true;
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return match;
        });
        this.startPaginate(true);
    };
    DatatableComponent.prototype.resetCheckBox = function () {
        if (this.cache.checkBoxHeadId) {
            var refElement = this.cache.checkBoxHeadId;
            document.querySelector('#' + refElement).checked = false;
        }
    };
    DatatableComponent.prototype.itemChecked = function (data, push) {
        if (push) {
            this.selectedrows.push(data);
        }
        else {
            var firstkey_1 = Object.keys(data)[0];
            this.selectedrows = this.selectedrows.filter(function (rdata) { return !(rdata[firstkey_1] === data[firstkey_1]); });
        }
        this.feedback.emit({ type: 'selectedrows', data: this.selectedrows });
        this.resetCheckBox();
    };
    DatatableComponent.prototype.emitSingleAction = function (action, data) {
        this.feedback.emit({ type: 'singleaction', action: action, data: data });
    };
    DatatableComponent.prototype.emitBulkAction = function (action) {
        this.feedback.emit({ type: 'bulkactions', action: action, data: this.selectedrows });
    };
    DatatableComponent.prototype.min = function (a, b) {
        return Math.min(a, b);
    };
    DatatableComponent.prototype.emitViewActions = function (data, key) {
        var _this = this;
        if (key === 'checkbox' || key === 'action') {
            return;
        }
        ['View/Edit', 'View / Edit', 'View', 'Edit'].forEach(function (action) { return _this.feedback.emit({ type: 'singleaction', action: action, data: data }); });
    };
    DatatableComponent.prototype.OnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    tslib_1.__decorate([
        Input()
    ], DatatableComponent.prototype, "options", void 0);
    tslib_1.__decorate([
        Input()
    ], DatatableComponent.prototype, "heads", void 0);
    tslib_1.__decorate([
        Input()
    ], DatatableComponent.prototype, "bodyrows", void 0);
    tslib_1.__decorate([
        Input()
    ], DatatableComponent.prototype, "dataChanged", void 0);
    tslib_1.__decorate([
        Output()
    ], DatatableComponent.prototype, "feedback", void 0);
    DatatableComponent = tslib_1.__decorate([
        Component({
            selector: 'ayo-datatable',
            template: "<div *ngIf=\"bodyrows\" class=\"t\">\r\n  <div class=\"text-muted row mb-1 top-options\">\r\n    <div class=\"col-12 mt-2 col-lg-9 text-left\">\r\n   <ayo-dropdown>\r\n        <div class=\"d-inline-block text-left mr-2\">\r\n          <button toggle-parent *ngIf=\"\r\n                    options && options.bulkActions && options.bulkActions.length > 0\r\n                  \" class=\"btn btn-outline-primary btn-sm\">\r\n            ACTIONS\r\n            <span><img src=\"img/caret_down_blue.svg\" width=\"13\" alt=\"\" /></span>\r\n          </button>\r\n          <div toggle class='border rounded bg-white' style='width: 200px'>\r\n            <a (click)=\"emitBulkAction(action)\" *ngFor=\"let action of options.bulkActions\" class='p-2 list-group-item-action dropdown-item'>\r\n              {{ action }}</a>\r\n          </div>\r\n        </div>\r\n   </ayo-dropdown>\r\n      <div class=\"d-inline-block text-left mr-2\">\r\n        <select\r\n          style=\"height: 30px; position: relative; top: 2px;\"\r\n          class=\"search border rounded\"\r\n          #paginateSelect\r\n          (change)=\"changePagination(paginateSelect.value)\"\r\n        >\r\n          <option>10</option>\r\n          <option>20</option>\r\n          <option>30</option>\r\n          <option>40</option>\r\n          <option>50</option>\r\n          <option>60</option>\r\n          <option>70</option>\r\n          <option>80</option>\r\n          <option>90</option>\r\n          <option>100</option>\r\n        </select>\r\n      </div>\r\n      <div *ngIf=\"refreshing\" class=\"d-inline-block text-left mr-2\">\r\n        <i><small>Refreshing... </small></i>\r\n        <i class=\"fa fa-spinner\"></i>\r\n      </div>\r\n      <div\r\n        *ngIf=\"bodyrows && bodyrows.length === 0\"\r\n        class=\"d-inline-block text-left mr-2 text-muted\"\r\n      >\r\n        <i class=\"fa fa-info-circle\"></i> No data to show\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 mt-2 col-md-6 col-lg-3 text-right\">\r\n      <input\r\n        #searchInput\r\n        class=\"pl-2 border rounded search\"\r\n        placeholder=\"Search\"\r\n        (input)=\"search(searchInput.value)\"\r\n      />\r\n    </div>\r\n\r\n    <!--sdsdsds dsdsds-->\r\n  </div>\r\n  <div class=\"data-table-container\">\r\n    <table cellspacing=\"0\" width=\"100% \">\r\n      <thead>\r\n        <tr>\r\n          <th\r\n            style=\"position: relative;\"\r\n            *ngFor=\"let head of heads; index as headIndex\"\r\n            class=\"th-sm\"\r\n          >\r\n            <div\r\n              *ngIf=\"head.key === 'checkbox'\"\r\n              class=\"custom-control custom-checkbox d-block text-center other-body\"\r\n            >\r\n              <input\r\n                id=\"{{ tableclass + '-checkbox-head' + headIndex }}\"\r\n                type=\"checkbox\"\r\n                class=\"custom-control-input text-center\"\r\n              />\r\n\r\n              <label\r\n                (click)=\"\r\n                  headClicked(head, tableclass + '-checkbox-head' + headIndex)\r\n                \"\r\n                class=\"custom-control-label\"\r\n                for=\"{{ tableclass + '-checkbox-head' + headIndex }}\"\r\n              ></label>\r\n            </div>\r\n            <div *ngIf=\"head.key === 'action'\" class='other-body'>\r\n              {{ head.title }}\r\n            </div>\r\n            <span\r\n              class=\"cursor each-useful-body \"\r\n              (click)=\"headClicked(head)\"\r\n              *ngIf=\"head.key !== 'action' && head.key !== 'checkbox'\"\r\n            >\r\n              {{ head.title }}\r\n\r\n              <span style=\"width: 20px;\"></span>\r\n            </span>\r\n\r\n            <span\r\n              class=\"sort-button ml-2\"\r\n              (click)=\"headClicked(head)\"\r\n              *ngIf=\"head.key !== 'action' && head.key !== 'checkbox'\"\r\n              id=\"{{ head.key }}-icon\"\r\n            >\r\n              <i class=\"fa fa-angle-down\"></i>\r\n            </span>\r\n          </th>\r\n        </tr>\r\n      </thead>\r\n      <tbody class=\"border box-shadow-deep\">\r\n        <tr *ngFor=\"let row of paginatedBodyrows; let bodyIndex = index\">\r\n          <td\r\n            *ngFor=\"let head of heads\"\r\n            (click)=\"emitViewActions(row, head.key)\"\r\n          >\r\n            <div\r\n              *ngIf=\"head.key === 'checkbox'\"\r\n              class=\"custom-control custom-checkbox d-block text-center other-body\"\r\n            >\r\n              <input\r\n                (change)=\"itemChecked(row, $event.target.checked)\"\r\n                id=\"{{ tableclass + '-checkbox' + bodyIndex }}\"\r\n                type=\"checkbox\"\r\n                class=\"custom-control-input text-center {{\r\n                  tableclass + '-checkbox'\r\n                }}\"\r\n              />\r\n              <label\r\n                class=\"custom-control-label\"\r\n                for=\"{{ tableclass + '-checkbox' + bodyIndex }}\"\r\n              ></label>\r\n            </div>\r\n            <span class='other-body' *ngIf=\"head.key === 'action'\">\r\n   \r\n              <ayo-dropdown [togglePosition]=\"{position:'left', value: '-180px'}\" >\r\n              <span toggle-parent class=\"p-2\">\r\n                <i class='fa fa-ellipsis-h'></i>\r\n              </span>\r\n\r\n                  <div toggle class='border rounded bg-white' style='width: 200px'>\r\n                  <div *ngFor=\"let action of options.singleActions\" >\r\n                      <a class='p-2 list-group-item-action dropdown-item' (click)=\"\r\n                                            emitSingleAction(\r\n                                              action.title ? action.title : action,\r\n                                              row\r\n                                            )\r\n                                          \" *ngIf=\"\r\n                                            !action.showIf ||\r\n                                            (action.showIf && action.showIf(row[head.key], row))\r\n                                          \">\r\n                        {{ action.title ? action.title : action }}\r\n                    \r\n                      </a>\r\n                    </div>\r\n                   \r\n                  </div>\r\n               \r\n              </ayo-dropdown>\r\n               \r\n               \r\n              \r\n            </span>\r\n            <span class=\"each-useful-body\" *ngIf=\"head.key !== 'action' && head.key !== 'checkbox'\">\r\n             \r\n              <span *ngIf=\"!dateFields[head.key] && !head.pipe\">{{\r\n                head.transform\r\n                  ? head.transform(row[head.key], row)\r\n                  : row[head.key]\r\n              }}</span>\r\n            </span>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <div class=\"float-left text-muted p-2\">\r\n    Showing {{ min(paginate * paginateIndex, bodyrows.length) }} of\r\n    {{ bodyrows.length }} results\r\n  </div>\r\n  <div class=\"text-right text-muted p-2\">\r\n    <button\r\n      (click)=\"nextPaginate(-1)\"\r\n      *ngIf=\"paginateIndex !== 1\"\r\n      class=\"mr-1 cursor btn btn-small-l btn-primary\"\r\n    >\r\n      previous\r\n    </button>\r\n    <b>{{ paginateIndex }} </b> / {{ totalAvailablePagination }}\r\n    <button\r\n      (click)=\"nextPaginate(1)\"\r\n      *ngIf=\"paginateIndex < totalAvailablePagination\"\r\n      class=\"ml-1 cursor btn btn-small-l btn-primary\"\r\n    >\r\n      Next\r\n    </button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"text-center p-2 text-muted\" *ngIf=\"!bodyrows\">\r\n  <i class=\"fa fa-spinner\"></i> Loading data\r\n</div>\r\n\r\n<br />\r\n<br />\r\n",
            styles: [".cursor{cursor:pointer}.t{margin-top:30px}.data-table-container{width:100%;height:auto!important;overflow-x:auto;padding-bottom:100px}.each-useful-body{display:inline-block;min-width:100px;max-height:50px;overflow:hidden}.other-body{min-width:50px}thead th{white-space:nowrap}.data-table-container:hover .top-options{visibility:visible}.btn-small-l{height:30px!important;width:auto!important;padding:5px 10px!important;font-size:12px}.sort-button{cursor:pointer;border:none}.custom-control-label{position:relative;top:-13px}table{border-spacing:1;border-collapse:collapse;background:#fff;border-radius:9px;width:100%;margin:0 auto}td a{cursor:pointer}td,th{padding-left:8px}thead tr{height:60px;border-bottom:1px solid #dee2ed;font-style:normal;font-weight:600;font-size:13px;color:#19233c}tbody tr{height:75px;border-bottom:1px solid #dee2ed;border-radius:20px;font-style:normal;font-weight:300;font-size:14px;color:#455a64}.search{height:30px}.fa-spinner{-webkit-animation-name:spin;animation-name:spin;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.box-shadow{box-shadow:0 .25rem .75rem rgba(0,0,0,.05)}.box-shadow-deep{box-shadow:0 5px 23px rgba(0,0,0,.05)!important}@-webkit-keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}"]
        })
    ], DatatableComponent);
    return DatatableComponent;
}());
export { DatatableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2F5by1kYXRhdGFibGUvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGF0YWJsZS9kYXRhdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7RUFNRTs7QUFJRixPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTy9FO0lBZ0NFO1FBQUEsaUJBQWlCO1FBL0JqQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFVBQUssR0FBRztZQUNOLGNBQWMsRUFBRSxFQUFFO1NBQ25CLENBQUM7UUFDRixlQUFVLEdBQUc7WUFDWCxTQUFTLEVBQUUsSUFBSTtZQUNmLFNBQVMsRUFBRSxJQUFJO1lBQ2YsV0FBVyxFQUFFLElBQUk7WUFDakIsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsSUFBSTtZQUNiLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUM7UUFFRixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsZUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTdHLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQix1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDdkIsNkJBQXdCLEdBQUcsQ0FBQyxDQUFDO1FBSzdCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBRXBCLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDQSxhQUFRLEdBQXNCLElBQUksWUFBWSxD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QThCO0lBRTVCO1FBQVQsTUFBTSxFQUFFO3dEQUEyRDtJQTVCekQsa0JBQWtCO1FBTDlCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxlQUFlO1lBQ3pCLHdyUEFBeUM7O1NBRTFDLENBQUM7T0FDVyxrQkFBa0IsQ0F3TzlCO0lBQUQseUJBQUM7Q0FBQSxBQXhPRCxJQXdPQztTQXhPWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG5AYXV0aG9yIFN1bm1vbGEgQXlva3VubGVcclxuQHZlcnNpb24gMS4wLjFcclxuQGRvY3MgaHR0cHM6Ly9naXRodWIuY29tL2F5b3R5Y29vbi9kb2NzL2Jsb2IvbWFzdGVyL25vdGNoLWRhdGF0YWJsZS5tZFxyXG5AbGFzdE1vZGlmaWVkIDI3IE1hcmNoIDIwMjBcclxuXHJcbiovXHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXlvLWRhdGF0YWJsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGF0YWJsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZGF0YXRhYmxlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGF0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVmcmVzaGluZyA9IGZhbHNlO1xyXG4gIGNhY2hlID0ge1xyXG4gICAgY2hlY2tCb3hIZWFkSWQ6ICcnXHJcbiAgfTtcclxuICBkYXRlRmllbGRzID0ge1xyXG4gICAgY3JlYXRlZEF0OiB0cnVlLFxyXG4gICAgdXBkYXRlZEF0OiB0cnVlLFxyXG4gICAgY3JlYXRlZERhdGU6IHRydWUsXHJcbiAgICBjcmVhdGVkT246IHRydWUsXHJcbiAgICBlbmREYXRlOiB0cnVlLFxyXG4gICAgcGF5bWVudER1ZURhdGU6IHRydWUsXHJcbiAgfTtcclxuXHJcbiAgaGVhZEhhc2ggPSB7fTtcclxuICB0YWJsZWNsYXNzID0gJ2EnICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDE1KSArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCAxNSk7XHJcblxyXG4gIHBhZ2luYXRlID0gMTA7XHJcbiAgcGFnaW5hdGVJbmRleCA9IDE7XHJcbiAgcGFnaW5hdGVBcnJheUluZGV4ID0gMTtcclxuICB0b3RhbEF2YWlsYWJsZVBhZ2luYXRpb24gPSAxO1xyXG5cclxuICBASW5wdXQoKSBvcHRpb25zO1xyXG4gIEBJbnB1dCgpIGhlYWRzO1xyXG4gIEBJbnB1dCgpIGJvZHlyb3dzO1xyXG4gIHN0YXRpY0JvZHlyb3dzID0gW107XHJcbiAgQElucHV0KCkgZGF0YUNoYW5nZWQ6IE9ic2VydmFibGU8YW55PjtcclxuICBzdWJzID0gW107XHJcbiAgQE91dHB1dCgpIGZlZWRiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PihudWxsKTtcclxuICBwYWdpbmF0ZWRCb2R5cm93cyA9IFtdO1xyXG4gIHNlbGVjdGVkcm93cyA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICBpZiAodGhpcy5kYXRhQ2hhbmdlZCkge1xyXG4gICAgICB0aGlzLnN1YnMucHVzaCh0aGlzLmRhdGFDaGFuZ2VkLnN1YnNjcmliZShjaGFuZ2VkID0+IHtcclxuICAgICAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICAgICAgdGhpcy5yZWZyZXNoaW5nID0gdHJ1ZTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdkZXRlY3RlZCBkYXRhIGNoYW5nZScpO1xyXG5cclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0aWNCb2R5cm93cyA9IHRoaXMuYm9keXJvd3MgPyBbLi4udGhpcy5ib2R5cm93c10gOiBbXTtcclxuICAgICAgICAgICAgdGhpcy5wYWdpbmF0ZUluZGV4ID0gMTtcclxuICAgICAgICAgICAgdGhpcy5wYWdpbmF0ZUFycmF5SW5kZXggPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVUYWJsZSgpO1xyXG5cclxuICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhdGljQm9keXJvd3MgPSB0aGlzLmJvZHlyb3dzID8gWy4uLnRoaXMuYm9keXJvd3NdIDogW107XHJcbiAgICB0aGlzLmluaXRpYWxpemVUYWJsZSgpO1xyXG5cclxuICB9XHJcblxyXG4gIGhlYWRDbGlja2VkID0gKGhlYWREYXRhLCByZWZFbGVtZW50PykgPT4ge1xyXG4gICAgc3dpdGNoIChoZWFkRGF0YS5rZXkpIHtcclxuICAgICAgY2FzZSAnY2hlY2tib3gnOlxyXG4gICAgICAgIHRoaXMuY2FjaGUuY2hlY2tCb3hIZWFkSWQgPSByZWZFbGVtZW50O1xyXG4gICAgICAgIGNvbnN0IGNoZWNrZWQgPSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgICcjJyArIHJlZkVsZW1lbnRcclxuICAgICAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQ7XHJcblxyXG5cclxuICAgICAgICBkb2N1bWVudFxyXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgdGhpcy50YWJsZWNsYXNzICsgJy1jaGVja2JveCcpXHJcbiAgICAgICAgICAuZm9yRWFjaChcclxuICAgICAgICAgICAgKGNoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50KSA9PlxyXG4gICAgICAgICAgICAgIChjaGVja2JveC5jaGVja2VkID0gIWNoZWNrZWQpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIGlmIChjaGVja2VkKSB7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkcm93cyA9IFtdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkcm93cyA9IFsuLi50aGlzLnBhZ2luYXRlZEJvZHlyb3dzXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZmVlZGJhY2suZW1pdCh7IHR5cGU6ICdzZWxlY3RlZHJvd3MnLCBkYXRhOiB0aGlzLnNlbGVjdGVkcm93cyB9KTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc3Qgc29ydGVkID0gdGhpcy5oZWFkSGFzaFtoZWFkRGF0YS5rZXldLnNvcnRlZDtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgaWYgKDEgPT09IDcpIHtcclxuICAgICAgICAgIHRoaXMuaGVhZEhhc2hbaGVhZERhdGEua2V5XSA9IHsgc29ydGVkOiBmYWxzZSB9O1xyXG4gICAgICAgICAgdGhpcy5ib2R5cm93cyA9IFsuLi50aGlzLnN0YXRpY0JvZHlyb3dzXTtcclxuICAgICAgICAgIHRoaXMuc3RhcnRQYWdpbmF0ZSgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYm9keXJvd3Muc29ydCgoYTogYW55LCBiOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmIChzb3J0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWFkSGFzaFtoZWFkRGF0YS5rZXldID0geyBzb3J0ZWQ6IGZhbHNlIH07XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBhO1xyXG4gICAgICAgICAgICBhID0gYjtcclxuICAgICAgICAgICAgYiA9IHRlbXA7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRIYXNoW2hlYWREYXRhLmtleV0gPSB7IHNvcnRlZDogdHJ1ZSB9O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChwYXJzZUludChhW2hlYWREYXRhLmtleV0pICYmIHBhcnNlSW50KGJbaGVhZERhdGEua2V5XSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFbaGVhZERhdGEua2V5XSAtIGJbaGVhZERhdGEua2V5XTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBuYW1lQSA9IGFbaGVhZERhdGEua2V5XSA/IChhW2hlYWREYXRhLmtleV0gKyAnJykudG9VcHBlckNhc2UoKSA6ICcnOyAvLyBpZ25vcmUgdXBwZXIgYW5kIGxvd2VyY2FzZVxyXG4gICAgICAgICAgY29uc3QgbmFtZUIgPSBiW2hlYWREYXRhLmtleV0gPyAoYltoZWFkRGF0YS5rZXldICsgJycpLnRvVXBwZXJDYXNlKCkgOiAnJzsgLy8gaWdub3JlIHVwcGVyIGFuZCBsb3dlcmNhc2VcclxuICAgICAgICAgIGlmIChuYW1lQSA8IG5hbWVCKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChuYW1lQSA+IG5hbWVCKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIG5hbWVzIG11c3QgYmUgZXF1YWxcclxuICAgICAgICAgIHJldHVybiAwO1xyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zdGFydFBhZ2luYXRlKCk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGhlYWREYXRhLmtleSArICctaWNvbicpO1xyXG4gICAgaWYgKCFlbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5oZWFkSGFzaFtoZWFkRGF0YS5rZXldLnNvcnRlZCkge1xyXG4gICAgICBlbC5pbm5lckhUTUwgPSBgICA8aSBjbGFzcz0nZmEgIGZhLWFuZ2xlLXVwJz48L2k+YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsLmlubmVySFRNTCA9IGAgIDxpIGNsYXNzPSdmYSAgZmEtYW5nbGUtZG93bic+PC9pPmA7XHJcbiAgICB9XHJcblxyXG5cclxuICB9XHJcbiAgaW5pdGlhbGl6ZVRhYmxlID0gKCkgPT4ge1xyXG4gICAgdGhpcy5oZWFkcy5mb3JFYWNoKGhlYWQgPT4ge1xyXG4gICAgICB0aGlzLmhlYWRIYXNoW2hlYWQua2V5XSA9IHsgc29ydGVkOiBmYWxzZSB9O1xyXG5cclxuXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RhcnRQYWdpbmF0ZSh0cnVlKTtcclxuICB9XHJcbiAgc3RhcnRQYWdpbmF0ZSA9IChpbml0PykgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmJvZHlyb3dzKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChpbml0KSB7XHJcbiAgICAgIHRoaXMudG90YWxBdmFpbGFibGVQYWdpbmF0aW9uID0gTWF0aC5jZWlsKFxyXG4gICAgICAgIHRoaXMuYm9keXJvd3MubGVuZ3RoIC8gdGhpcy5wYWdpbmF0ZVxyXG4gICAgICApIHx8IDE7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wYWdpbmF0ZWRCb2R5cm93cyA9IHRoaXMuYm9keXJvd3Muc2xpY2UoXHJcbiAgICAgIHRoaXMucGFnaW5hdGVBcnJheUluZGV4IC0gMSxcclxuICAgICAgdGhpcy5wYWdpbmF0ZSArICh0aGlzLnBhZ2luYXRlQXJyYXlJbmRleCAtIDEpXHJcbiAgICApO1xyXG5cclxuICB9XHJcbiAgbmV4dFBhZ2luYXRlKG4pIHtcclxuICAgIHRoaXMucGFnaW5hdGVJbmRleCArPSAobik7XHJcbiAgICB0aGlzLnBhZ2luYXRlQXJyYXlJbmRleCArPSAobiAqIHRoaXMucGFnaW5hdGUpO1xyXG4gICAgdGhpcy5zdGFydFBhZ2luYXRlKCk7XHJcbiAgICB0aGlzLnJlc2V0Q2hlY2tCb3goKTtcclxuICB9XHJcbiAgY2hhbmdlUGFnaW5hdGlvbihuKSB7XHJcbiAgICB0aGlzLnBhZ2luYXRlID0gcGFyc2VJbnQobik7XHJcbiAgICB0aGlzLnBhZ2luYXRlSW5kZXggPSAxO1xyXG4gICAgdGhpcy5wYWdpbmF0ZUFycmF5SW5kZXggPSAxO1xyXG4gICAgdGhpcy5pbml0aWFsaXplVGFibGUoKTtcclxuICB9XHJcbiAgc2VhcmNoKHNlYXJjaElucHV0KSB7XHJcbiAgICB0aGlzLmJvZHlyb3dzID0gdGhpcy5zdGF0aWNCb2R5cm93cy5maWx0ZXIob2JqID0+IHtcclxuICAgICAgbGV0IG1hdGNoID0gZmFsc2U7XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9iaikpIHtcclxuICAgICAgICBpZiAoKG9ialtrZXldICsgJycpLnRvTG93ZXJDYXNlKCkubWF0Y2goc2VhcmNoSW5wdXQudHJpbSgpLnRvTG93ZXJDYXNlKCkpKSB7XHJcbiAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBtYXRjaDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdGFydFBhZ2luYXRlKHRydWUpO1xyXG4gIH1cclxuICByZXNldENoZWNrQm94KCkge1xyXG4gICAgaWYgKHRoaXMuY2FjaGUuY2hlY2tCb3hIZWFkSWQpIHtcclxuICAgICAgY29uc3QgcmVmRWxlbWVudCA9IHRoaXMuY2FjaGUuY2hlY2tCb3hIZWFkSWQ7XHJcblxyXG4gICAgICAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAnIycgKyByZWZFbGVtZW50XHJcbiAgICAgICkgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuICBpdGVtQ2hlY2tlZChkYXRhLCBwdXNoPykge1xyXG4gICAgaWYgKHB1c2gpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZHJvd3MucHVzaChkYXRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGZpcnN0a2V5ID0gT2JqZWN0LmtleXMoZGF0YSlbMF07XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRyb3dzID0gdGhpcy5zZWxlY3RlZHJvd3MuZmlsdGVyKHJkYXRhID0+ICEocmRhdGFbZmlyc3RrZXldID09PSBkYXRhW2ZpcnN0a2V5XSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHRoaXMuZmVlZGJhY2suZW1pdCh7IHR5cGU6ICdzZWxlY3RlZHJvd3MnLCBkYXRhOiB0aGlzLnNlbGVjdGVkcm93cyB9KTtcclxuICAgIHRoaXMucmVzZXRDaGVja0JveCgpO1xyXG5cclxuXHJcbiAgfVxyXG4gIGVtaXRTaW5nbGVBY3Rpb24oYWN0aW9uLCBkYXRhKSB7XHJcbiAgICB0aGlzLmZlZWRiYWNrLmVtaXQoeyB0eXBlOiAnc2luZ2xlYWN0aW9uJywgYWN0aW9uLCBkYXRhIH0pO1xyXG5cclxuICB9XHJcbiAgZW1pdEJ1bGtBY3Rpb24oYWN0aW9uKSB7XHJcbiAgICB0aGlzLmZlZWRiYWNrLmVtaXQoeyB0eXBlOiAnYnVsa2FjdGlvbnMnLCBhY3Rpb24sIGRhdGE6IHRoaXMuc2VsZWN0ZWRyb3dzIH0pO1xyXG5cclxuICB9XHJcbiAgbWluKGEsIGIpIHtcclxuICAgIHJldHVybiBNYXRoLm1pbihhLCBiKTtcclxuICB9XHJcblxyXG5cclxuICBlbWl0Vmlld0FjdGlvbnMoZGF0YSwga2V5KSB7XHJcblxyXG4gICAgaWYgKGtleSA9PT0gJ2NoZWNrYm94JyB8fCBrZXkgPT09ICdhY3Rpb24nKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFsnVmlldy9FZGl0JywgJ1ZpZXcgLyBFZGl0JywgJ1ZpZXcnLCAnRWRpdCddLmZvckVhY2goYWN0aW9uID0+IHRoaXMuZmVlZGJhY2suZW1pdCh7IHR5cGU6ICdzaW5nbGVhY3Rpb24nLCBhY3Rpb24sIGRhdGEgfSkpO1xyXG5cclxuICB9XHJcbiAgT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5zdWJzLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcclxuICB9XHJcbn1cclxuIl19