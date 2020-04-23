import { __spread, __values, __decorate } from 'tslib';
import { EventEmitter, Input, Output, Component, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*
@author Sunmola Ayokunle
@version 1.0.1
@docs https://github.com/ayotycoon/docs/blob/master/notch-datatable.md
@lastModified 27 March 2020

*/
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
                        _this.selectedrows = __spread(_this.paginatedBodyrows);
                    }
                    _this.feedback.emit({ type: 'selectedrows', data: _this.selectedrows });
                    break;
                default:
                    var sorted_1 = _this.headHash[headData.key].sorted;
                    // @ts-ignore
                    if (1 === 7) {
                        _this.headHash[headData.key] = { sorted: false };
                        _this.bodyrows = __spread(_this.staticBodyrows);
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
                        _this.staticBodyrows = _this.bodyrows ? __spread(_this.bodyrows) : [];
                        _this.paginateIndex = 1;
                        _this.paginateArrayIndex = 1;
                        _this.initializeTable();
                    }, 1000);
                }
            }));
        }
        this.staticBodyrows = this.bodyrows ? __spread(this.bodyrows) : [];
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
                for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    __decorate([
        Input()
    ], DatatableComponent.prototype, "options", void 0);
    __decorate([
        Input()
    ], DatatableComponent.prototype, "heads", void 0);
    __decorate([
        Input()
    ], DatatableComponent.prototype, "bodyrows", void 0);
    __decorate([
        Input()
    ], DatatableComponent.prototype, "dataChanged", void 0);
    __decorate([
        Output()
    ], DatatableComponent.prototype, "feedback", void 0);
    DatatableComponent = __decorate([
        Component({
            selector: 'ayo-datatable',
            template: "<div *ngIf=\"bodyrows\" class=\"t\">\r\n  <div class=\"text-muted row mb-1 top-options\">\r\n    <div class=\"col-12 mt-2 col-lg-9 text-left\">\r\n   <ayo-dropdown>\r\n        <div class=\"d-inline-block text-left mr-2\">\r\n          <button toggle-parent *ngIf=\"\r\n                    options && options.bulkActions && options.bulkActions.length > 0\r\n                  \" class=\"btn btn-outline-primary btn-sm\">\r\n            ACTIONS\r\n            <span><img src=\"img/caret_down_blue.svg\" width=\"13\" alt=\"\" /></span>\r\n          </button>\r\n          <div toggle class='border rounded bg-white' style='width: 200px'>\r\n            <a (click)=\"emitBulkAction(action)\" *ngFor=\"let action of options.bulkActions\" class='p-2 list-group-item-action dropdown-item'>\r\n              {{ action }}</a>\r\n          </div>\r\n        </div>\r\n   </ayo-dropdown>\r\n      <div class=\"d-inline-block text-left mr-2\">\r\n        <select\r\n          style=\"height: 30px; position: relative; top: 2px;\"\r\n          class=\"search border rounded\"\r\n          #paginateSelect\r\n          (change)=\"changePagination(paginateSelect.value)\"\r\n        >\r\n          <option>10</option>\r\n          <option>20</option>\r\n          <option>30</option>\r\n          <option>40</option>\r\n          <option>50</option>\r\n          <option>60</option>\r\n          <option>70</option>\r\n          <option>80</option>\r\n          <option>90</option>\r\n          <option>100</option>\r\n        </select>\r\n      </div>\r\n      <div *ngIf=\"refreshing\" class=\"d-inline-block text-left mr-2\">\r\n        <i><small>Refreshing... </small></i>\r\n        <i class=\"fa fa-spinner\"></i>\r\n      </div>\r\n      <div\r\n        *ngIf=\"bodyrows && bodyrows.length === 0\"\r\n        class=\"d-inline-block text-left mr-2 text-muted\"\r\n      >\r\n        <i class=\"fa fa-info-circle\"></i> No data to show\r\n      </div>\r\n    </div>\r\n    <div class=\"col-12 mt-2 col-md-6 col-lg-3 text-right\">\r\n      <input\r\n        #searchInput\r\n        class=\"pl-2 border rounded search\"\r\n        placeholder=\"Search\"\r\n        (input)=\"search(searchInput.value)\"\r\n      />\r\n    </div>\r\n\r\n    <!--sdsdsds dsdsds-->\r\n  </div>\r\n  <div class=\"data-table-container\">\r\n    <table cellspacing=\"0\" width=\"100% \">\r\n      <thead>\r\n        <tr>\r\n          <th\r\n            style=\"position: relative;\"\r\n            *ngFor=\"let head of heads; index as headIndex\"\r\n            class=\"th-sm\"\r\n          >\r\n            <div\r\n              *ngIf=\"head.key === 'checkbox'\"\r\n              class=\"custom-control custom-checkbox d-block text-center other-body\"\r\n            >\r\n              <input\r\n                id=\"{{ tableclass + '-checkbox-head' + headIndex }}\"\r\n                type=\"checkbox\"\r\n                class=\"custom-control-input text-center\"\r\n              />\r\n\r\n              <label\r\n                (click)=\"\r\n                  headClicked(head, tableclass + '-checkbox-head' + headIndex)\r\n                \"\r\n                class=\"custom-control-label\"\r\n                for=\"{{ tableclass + '-checkbox-head' + headIndex }}\"\r\n              ></label>\r\n            </div>\r\n            <div *ngIf=\"head.key === 'action'\" class='other-body'>\r\n              {{ head.title }}\r\n            </div>\r\n            <span\r\n              class=\"cursor each-useful-body \"\r\n              (click)=\"headClicked(head)\"\r\n              *ngIf=\"head.key !== 'action' && head.key !== 'checkbox'\"\r\n            >\r\n              {{ head.title }}\r\n\r\n              <span style=\"width: 20px;\"></span>\r\n            </span>\r\n\r\n            <span\r\n              class=\"sort-button ml-2\"\r\n              (click)=\"headClicked(head)\"\r\n              *ngIf=\"head.key !== 'action' && head.key !== 'checkbox'\"\r\n              id=\"{{ head.key }}-icon\"\r\n            >\r\n              <i class=\"fa fa-angle-down\"></i>\r\n            </span>\r\n          </th>\r\n        </tr>\r\n      </thead>\r\n      <tbody class=\"border box-shadow-deep\">\r\n        <tr *ngFor=\"let row of paginatedBodyrows; let bodyIndex = index\">\r\n          <td\r\n            *ngFor=\"let head of heads\"\r\n            (click)=\"emitViewActions(row, head.key)\"\r\n          >\r\n            <div\r\n              *ngIf=\"head.key === 'checkbox'\"\r\n              class=\"custom-control custom-checkbox d-block text-center other-body\"\r\n            >\r\n              <input\r\n                (change)=\"itemChecked(row, $event.target.checked)\"\r\n                id=\"{{ tableclass + '-checkbox' + bodyIndex }}\"\r\n                type=\"checkbox\"\r\n                class=\"custom-control-input text-center {{\r\n                  tableclass + '-checkbox'\r\n                }}\"\r\n              />\r\n              <label\r\n                class=\"custom-control-label\"\r\n                for=\"{{ tableclass + '-checkbox' + bodyIndex }}\"\r\n              ></label>\r\n            </div>\r\n            <span class='other-body' *ngIf=\"head.key === 'action'\">\r\n   \r\n              <ayo-dropdown [togglePosition]=\"{position:'left', value: '-180px'}\" >\r\n              <span toggle-parent class=\"p-2\">\r\n                <i class='fa fa-ellipsis-h'></i>\r\n              </span>\r\n\r\n                  <div toggle class='border rounded bg-white' style='width: 200px'>\r\n                  <div *ngFor=\"let action of options.singleActions\" >\r\n                      <a class='p-2 list-group-item-action dropdown-item' (click)=\"\r\n                                            emitSingleAction(\r\n                                              action.title ? action.title : action,\r\n                                              row\r\n                                            )\r\n                                          \" *ngIf=\"\r\n                                            !action.showIf ||\r\n                                            (action.showIf && action.showIf(row[head.key], row))\r\n                                          \">\r\n                        {{ action.title ? action.title : action }}\r\n                    \r\n                      </a>\r\n                    </div>\r\n                   \r\n                  </div>\r\n               \r\n              </ayo-dropdown>\r\n               \r\n               \r\n              \r\n            </span>\r\n            <span class=\"each-useful-body\" *ngIf=\"head.key !== 'action' && head.key !== 'checkbox'\">\r\n             \r\n              <span *ngIf=\"!dateFields[head.key] && !head.pipe\">{{\r\n                head.transform\r\n                  ? head.transform(row[head.key], row)\r\n                  : row[head.key]\r\n              }}</span>\r\n            </span>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <div class=\"float-left text-muted p-2\">\r\n    Showing {{ min(paginate * paginateIndex, bodyrows.length) }} of\r\n    {{ bodyrows.length }} results\r\n  </div>\r\n  <div class=\"text-right text-muted p-2\">\r\n    <button\r\n      (click)=\"nextPaginate(-1)\"\r\n      *ngIf=\"paginateIndex !== 1\"\r\n      class=\"mr-1 cursor btn btn-small-l btn-primary\"\r\n    >\r\n      previous\r\n    </button>\r\n    <b>{{ paginateIndex }} </b> / {{ totalAvailablePagination }}\r\n    <button\r\n      (click)=\"nextPaginate(1)\"\r\n      *ngIf=\"paginateIndex < totalAvailablePagination\"\r\n      class=\"ml-1 cursor btn btn-small-l btn-primary\"\r\n    >\r\n      Next\r\n    </button>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"text-center p-2 text-muted\" *ngIf=\"!bodyrows\">\r\n  <i class=\"fa fa-spinner\"></i> Loading data\r\n</div>\r\n\r\n<br />\r\n<br />\r\n",
            styles: [".cursor{cursor:pointer}.t{margin-top:30px}.data-table-container{width:100%;height:auto!important;overflow-x:auto;padding-bottom:100px}.each-useful-body{display:inline-block;min-width:100px;max-height:50px;overflow:hidden}.other-body{min-width:50px}thead th{white-space:nowrap}.data-table-container:hover .top-options{visibility:visible}.btn-small-l{height:30px!important;width:auto!important;padding:5px 10px!important;font-size:12px}.sort-button{cursor:pointer;border:none}.custom-control-label{position:relative;top:-13px}table{border-spacing:1;border-collapse:collapse;background:#fff;border-radius:9px;width:100%;margin:0 auto}td a{cursor:pointer}td,th{padding-left:8px}thead tr{height:60px;border-bottom:1px solid #dee2ed;font-style:normal;font-weight:600;font-size:13px;color:#19233c}tbody tr{height:75px;border-bottom:1px solid #dee2ed;border-radius:20px;font-style:normal;font-weight:300;font-size:14px;color:#455a64}.search{height:30px}.fa-spinner{-webkit-animation-name:spin;animation-name:spin;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.box-shadow{box-shadow:0 .25rem .75rem rgba(0,0,0,.05)}.box-shadow-deep{box-shadow:0 5px 23px rgba(0,0,0,.05)!important}@-webkit-keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}"]
        })
    ], DatatableComponent);
    return DatatableComponent;
}());

var DropdownComponent = /** @class */ (function () {
    function DropdownComponent() {
        this.clicked = false;
        this.canClickOutside = false;
    }
    DropdownComponent.prototype.ngOnInit = function () {
    };
    DropdownComponent.prototype.toggleClicked = function () {
        var _this = this;
        this.clicked = !this.clicked;
        function isDescendant(parent, child) {
            var node = child.parentNode;
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
            if (this.canClickOutsideSetTimeoutRef) {
                clearTimeout(this.canClickOutsideSetTimeoutRef);
            }
            this.canClickOutsideSetTimeoutRef = setTimeout(function () {
                _this.canClickOutside = true;
            }, 100);
            this.clickedFunRef = window.addEventListener('click', function (e) {
                if (!isDescendant(_this.toggleEl, e.target) && _this.canClickOutside) {
                    _this.toggleClicked();
                }
            });
        }
        else {
            this.canClickOutside = false;
            this.toggleEl.style.display = 'none';
            this.myDivElementRef.nativeElement.style.zIndex = '2';
        }
    };
    DropdownComponent.prototype.ngAfterViewInit = function () {
        this.toggleEl = this.myDivElementRef.nativeElement.querySelector('[toggle]');
        this.toggleEl.style.display = 'none';
        this.toggleEl.style.position = 'absolute';
        if (this.togglePosition) {
            this.toggleEl.style[this.togglePosition['position']] = this.togglePosition['value'];
        }
    };
    DropdownComponent.prototype.ngOnDestroy = function () {
        if (this.clickedFunRef) {
            window.removeEventListener('click', this.clickedFunRef);
        }
    };
    __decorate([
        ViewChild('Dropdown', null)
    ], DropdownComponent.prototype, "myDivElementRef", void 0);
    __decorate([
        Input()
    ], DropdownComponent.prototype, "togglePosition", void 0);
    DropdownComponent = __decorate([
        Component({
            selector: 'ayo-dropdown',
            template: "<div (click)='toggleClicked()' #Dropdown class=\"d-inline-block dropdown\">\n    \n<ng-content></ng-content>\n\n    <div class=\"d-body\">\n\n    </div>\n</div>",
            styles: [".dropdown{position:relative;z-index:2}"]
        })
    ], DropdownComponent);
    return DropdownComponent;
}());

var DatatableModule = /** @class */ (function () {
    function DatatableModule() {
    }
    DatatableModule = __decorate([
        NgModule({
            declarations: [DatatableComponent, DropdownComponent],
            imports: [
                CommonModule
            ],
            exports: [DatatableComponent]
        })
    ], DatatableModule);
    return DatatableModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { DatatableModule, DatatableComponent as ɵa, DropdownComponent as ɵb };
//# sourceMappingURL=ayo-datatable.js.map
