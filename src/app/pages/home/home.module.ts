import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { GenericDataTableModule } from "src/app/components/genericdatatable/genericdatatable.module";

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, GenericDataTableModule],
	declarations: [HomePage],
})
export class HomePageModule {}
