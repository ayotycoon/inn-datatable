import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './components/datatable/datatable.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';



@NgModule({
  declarations: [DatatableComponent, DropdownComponent],
  imports: [
    CommonModule
  ],
  exports: [DatatableComponent, DropdownComponent]
})
export class DatatableModule { }
