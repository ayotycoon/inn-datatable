import * as tslib_1 from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
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
    tslib_1.__decorate([
        ViewChild('Dropdown', null)
    ], DropdownComponent.prototype, "myDivElementRef", void 0);
    tslib_1.__decorate([
        Input()
    ], DropdownComponent.prototype, "togglePosition", void 0);
    DropdownComponent = tslib_1.__decorate([
        Component({
            selector: 'ayo-dropdown',
            template: "<div (click)='toggleClicked()' #Dropdown class=\"d-inline-block dropdown\">\n    \n<ng-content></ng-content>\n\n    <div class=\"d-body\">\n\n    </div>\n</div>",
            styles: [".dropdown{position:relative;z-index:2}"]
        })
    ], DropdownComponent);
    return DropdownComponent;
}());
export { DropdownComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYXlvLWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBd0MsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTzFHO0lBV0U7UUFOQSxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBR2hCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO0lBR1IsQ0FBQztJQUVqQixvQ0FBUSxHQUFSO0lBTUEsQ0FBQztJQUlELHlDQUFhLEdBQWI7UUFBQSxpQkF3Q0M7UUF2Q0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFJN0IsU0FBUyxZQUFZLENBQUMsTUFBbUIsRUFBRSxLQUFrQjtZQUMzRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQzVCLE9BQU8sSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDbkIsSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFO29CQUNsQixPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUN4QjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ3RELElBQUksSUFBSSxDQUFDLDRCQUE0QixFQUFDO2dCQUNwQyxZQUFZLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUE7YUFDaEQ7WUFFRCxJQUFJLENBQUMsNEJBQTRCLEdBQUcsVUFBVSxDQUFDO2dCQUM3QyxLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUM5QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFNO2dCQUczRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUksQ0FBQyxlQUFlLEVBQUU7b0JBRWxFLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtpQkFDckI7WUFDSCxDQUFDLENBQUMsQ0FBQTtTQUdMO2FBQU07WUFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQztJQUNELDJDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUc3RSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDMUMsSUFBRyxJQUFJLENBQUMsY0FBYyxFQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3JGO0lBR0gsQ0FBQztJQUNELHVDQUFXLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7U0FDeEQ7SUFFSCxDQUFDO0lBaEY0QjtRQUE1QixTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQzs4REFBNkI7SUFDaEQ7UUFBUixLQUFLLEVBQUU7NkRBQXFCO0lBRmxCLGlCQUFpQjtRQUw3QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsY0FBYztZQUN4Qiw0S0FBd0M7O1NBRXpDLENBQUM7T0FDVyxpQkFBaUIsQ0FtRjdCO0lBQUQsd0JBQUM7Q0FBQSxBQW5GRCxJQW1GQztTQW5GWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F5by1kcm9wZG93bicsXG4gIHRlbXBsYXRlVXJsOiAnLi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Ryb3Bkb3duLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBEcm9wZG93bkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdEcm9wZG93bicsIG51bGwpIG15RGl2RWxlbWVudFJlZjogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgdG9nZ2xlUG9zaXRpb246IGFueTtcbiAgdG9nZ2xlRWw6IEhUTUxEaXZFbGVtZW50O1xuICBwYXJlbnRUb2dnbGVFbDogSFRNTERpdkVsZW1lbnQ7XG4gIGNsaWNrZWQgPSBmYWxzZTtcbiAgY2xpY2tlZEZ1blJlZjogYW55O1xuICBwYXJlbnRGdW5SZWY6IGFueTtcbiAgY2FuQ2xpY2tPdXRzaWRlID0gZmFsc2U7XG4gIGNhbkNsaWNrT3V0c2lkZVNldFRpbWVvdXRSZWY6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuXG5cblxuXG5cbiAgfVxuXG5cblxuICB0b2dnbGVDbGlja2VkKCkge1xuICAgIHRoaXMuY2xpY2tlZCA9ICF0aGlzLmNsaWNrZWQ7XG5cblxuIFxuICAgIGZ1bmN0aW9uIGlzRGVzY2VuZGFudChwYXJlbnQ6IEhUTUxFbGVtZW50LCBjaGlsZDogSFRNTEVsZW1lbnQpIHtcbiAgICAgIGxldCBub2RlID0gY2hpbGQucGFyZW50Tm9kZTtcbiAgICAgIHdoaWxlIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgaWYgKG5vZGUgPT0gcGFyZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2xpY2tlZCkge1xuICAgICAgdGhpcy50b2dnbGVFbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMubXlEaXZFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuekluZGV4ID0gJzYnO1xuICAgICAgaWYgKHRoaXMuY2FuQ2xpY2tPdXRzaWRlU2V0VGltZW91dFJlZil7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNhbkNsaWNrT3V0c2lkZVNldFRpbWVvdXRSZWYpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2FuQ2xpY2tPdXRzaWRlU2V0VGltZW91dFJlZiA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNhbkNsaWNrT3V0c2lkZSA9IHRydWU7XG4gICAgICB9LCAxMDApO1xuICAgICAgICB0aGlzLmNsaWNrZWRGdW5SZWYgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogYW55KSA9PiB7XG5cbiAgICAgICAgIFxuICAgICAgICAgIGlmICghaXNEZXNjZW5kYW50KHRoaXMudG9nZ2xlRWwsIGUudGFyZ2V0KSAmJiB0aGlzLmNhbkNsaWNrT3V0c2lkZSkge1xuXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUNsaWNrZWQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FuQ2xpY2tPdXRzaWRlID0gZmFsc2U7XG4gICAgICB0aGlzLnRvZ2dsZUVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLm15RGl2RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnpJbmRleCA9ICcyJztcbiAgICB9XG4gIH1cbiAgbmdBZnRlclZpZXdJbml0KCl7XG4gICAgdGhpcy50b2dnbGVFbCA9IHRoaXMubXlEaXZFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignW3RvZ2dsZV0nKTtcblxuXG4gICAgdGhpcy50b2dnbGVFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRoaXMudG9nZ2xlRWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGlmKHRoaXMudG9nZ2xlUG9zaXRpb24pe1xuICAgICAgdGhpcy50b2dnbGVFbC5zdHlsZVt0aGlzLnRvZ2dsZVBvc2l0aW9uWydwb3NpdGlvbiddXSA9IHRoaXMudG9nZ2xlUG9zaXRpb25bJ3ZhbHVlJ107XG4gICAgfVxuIFxuXG4gIH1cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY2xpY2tlZEZ1blJlZikge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja2VkRnVuUmVmKVxuICAgIH1cbiBcbiAgfVxuXG59XG4iXX0=