import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { GenericDataTableComponent } from "./genericdatatable.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, NgxDatatableModule],
	exports: [GenericDataTableComponent],
	declarations: [GenericDataTableComponent],
	providers: [],
})
export class GenericDataTableModule {}
