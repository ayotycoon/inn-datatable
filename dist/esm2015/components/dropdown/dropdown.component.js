import * as tslib_1 from "tslib";
import { Component, ViewChild, Input } from '@angular/core';
let DropdownComponent = class DropdownComponent {
    constructor() {
        this.clicked = false;
        this.canClickOutside = false;
    }
    ngOnInit() {
    }
    toggleClicked() {
        this.clicked = !this.clicked;
        function isDescendant(parent, child) {
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
            if (this.canClickOutsideSetTimeoutRef) {
                clearTimeout(this.canClickOutsideSetTimeoutRef);
            }
            this.canClickOutsideSetTimeoutRef = setTimeout(() => {
                this.canClickOutside = true;
            }, 100);
            this.clickedFunRef = window.addEventListener('click', (e) => {
                if (!isDescendant(this.toggleEl, e.target) && this.canClickOutside) {
                    this.toggleClicked();
                }
            });
        }
        else {
            this.canClickOutside = false;
            this.toggleEl.style.display = 'none';
            this.myDivElementRef.nativeElement.style.zIndex = '2';
        }
    }
    ngAfterViewInit() {
        this.toggleEl = this.myDivElementRef.nativeElement.querySelector('[toggle]');
        this.toggleEl.style.display = 'none';
        this.toggleEl.style.position = 'absolute';
        if (this.togglePosition) {
            this.toggleEl.style[this.togglePosition['position']] = this.togglePosition['value'];
        }
    }
    ngOnDestroy() {
        if (this.clickedFunRef) {
            window.removeEventListener('click', this.clickedFunRef);
        }
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
export { DropdownComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYXlvLWRhdGF0YWJsZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFNBQVMsRUFBd0MsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTzFHLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBVzVCO1FBTkEsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUdoQixvQkFBZSxHQUFHLEtBQUssQ0FBQztJQUdSLENBQUM7SUFFakIsUUFBUTtJQU1SLENBQUM7SUFJRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFJN0IsU0FBUyxZQUFZLENBQUMsTUFBbUIsRUFBRSxLQUFrQjtZQUMzRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQzVCLE9BQU8sSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDbkIsSUFBSSxJQUFJLElBQUksTUFBTSxFQUFFO29CQUNsQixPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUN4QjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ3RELElBQUksSUFBSSxDQUFDLDRCQUE0QixFQUFDO2dCQUNwQyxZQUFZLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUE7YUFDaEQ7WUFFRCxJQUFJLENBQUMsNEJBQTRCLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDOUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBTSxFQUFFLEVBQUU7Z0JBRy9ELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtvQkFFbEUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO2lCQUNyQjtZQUNILENBQUMsQ0FBQyxDQUFBO1NBR0w7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDdkQ7SUFDSCxDQUFDO0lBQ0QsZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRzdFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMxQyxJQUFHLElBQUksQ0FBQyxjQUFjLEVBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDckY7SUFHSCxDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUN4RDtJQUVILENBQUM7Q0FFRixDQUFBO0FBbEY4QjtJQUE1QixTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQzswREFBNkI7QUFDaEQ7SUFBUixLQUFLLEVBQUU7eURBQXFCO0FBRmxCLGlCQUFpQjtJQUw3QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsY0FBYztRQUN4Qiw0S0FBd0M7O0tBRXpDLENBQUM7R0FDVyxpQkFBaUIsQ0FtRjdCO1NBbkZZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXlvLWRyb3Bkb3duJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Ryb3Bkb3duLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZHJvcGRvd24uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIERyb3Bkb3duQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ0Ryb3Bkb3duJywgbnVsbCkgbXlEaXZFbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSB0b2dnbGVQb3NpdGlvbjogYW55O1xuICB0b2dnbGVFbDogSFRNTERpdkVsZW1lbnQ7XG4gIHBhcmVudFRvZ2dsZUVsOiBIVE1MRGl2RWxlbWVudDtcbiAgY2xpY2tlZCA9IGZhbHNlO1xuICBjbGlja2VkRnVuUmVmOiBhbnk7XG4gIHBhcmVudEZ1blJlZjogYW55O1xuICBjYW5DbGlja091dHNpZGUgPSBmYWxzZTtcbiAgY2FuQ2xpY2tPdXRzaWRlU2V0VGltZW91dFJlZjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG5cblxuXG5cblxuICB9XG5cblxuXG4gIHRvZ2dsZUNsaWNrZWQoKSB7XG4gICAgdGhpcy5jbGlja2VkID0gIXRoaXMuY2xpY2tlZDtcblxuXG4gXG4gICAgZnVuY3Rpb24gaXNEZXNjZW5kYW50KHBhcmVudDogSFRNTEVsZW1lbnQsIGNoaWxkOiBIVE1MRWxlbWVudCkge1xuICAgICAgbGV0IG5vZGUgPSBjaGlsZC5wYXJlbnROb2RlO1xuICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICBpZiAobm9kZSA9PSBwYXJlbnQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5jbGlja2VkKSB7XG4gICAgICB0aGlzLnRvZ2dsZUVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgdGhpcy5teURpdkVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS56SW5kZXggPSAnNic7XG4gICAgICBpZiAodGhpcy5jYW5DbGlja091dHNpZGVTZXRUaW1lb3V0UmVmKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY2FuQ2xpY2tPdXRzaWRlU2V0VGltZW91dFJlZilcbiAgICAgIH1cblxuICAgICAgdGhpcy5jYW5DbGlja091dHNpZGVTZXRUaW1lb3V0UmVmID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2FuQ2xpY2tPdXRzaWRlID0gdHJ1ZTtcbiAgICAgIH0sIDEwMCk7XG4gICAgICAgIHRoaXMuY2xpY2tlZEZ1blJlZiA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBhbnkpID0+IHtcblxuICAgICAgICAgXG4gICAgICAgICAgaWYgKCFpc0Rlc2NlbmRhbnQodGhpcy50b2dnbGVFbCwgZS50YXJnZXQpICYmIHRoaXMuY2FuQ2xpY2tPdXRzaWRlKSB7XG5cbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQ2xpY2tlZCgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICBcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYW5DbGlja091dHNpZGUgPSBmYWxzZTtcbiAgICAgIHRoaXMudG9nZ2xlRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHRoaXMubXlEaXZFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUuekluZGV4ID0gJzInO1xuICAgIH1cbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKXtcbiAgICB0aGlzLnRvZ2dsZUVsID0gdGhpcy5teURpdkVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbdG9nZ2xlXScpO1xuXG5cbiAgICB0aGlzLnRvZ2dsZUVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGhpcy50b2dnbGVFbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgaWYodGhpcy50b2dnbGVQb3NpdGlvbil7XG4gICAgICB0aGlzLnRvZ2dsZUVsLnN0eWxlW3RoaXMudG9nZ2xlUG9zaXRpb25bJ3Bvc2l0aW9uJ11dID0gdGhpcy50b2dnbGVQb3NpdGlvblsndmFsdWUnXTtcbiAgICB9XG4gXG5cbiAgfVxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5jbGlja2VkRnVuUmVmKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrZWRGdW5SZWYpXG4gICAgfVxuIFxuICB9XG5cbn1cbiJdfQ==