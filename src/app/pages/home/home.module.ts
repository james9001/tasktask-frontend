import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { GenericDataTableModule } from "src/app/components/genericdatatable/genericdatatable.module";
import { GenericdataeditPageModule } from "src/app/components/genericdataedit/genericdataedit.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HomePageRoutingModule,
		GenericDataTableModule,
		GenericdataeditPageModule,
	],
	declarations: [HomePage],
})
export class HomePageModule {}
