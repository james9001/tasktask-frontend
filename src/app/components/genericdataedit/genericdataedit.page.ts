import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import {
	GenericDataTableState,
	GenericDatatableModel,
} from "../genericdatatable/genericdatatable.model";

@Component({
	selector: "app-genericdataedit",
	templateUrl: "./genericdataedit.page.html",
})
export class GenericdataeditPage {
	@Input() state!: GenericDataTableState;
	@Input() model!: GenericDatatableModel;

	@Input() onCreate!: (model: GenericDatatableModel) => void;
	@Input() onUpdate!: (model: GenericDatatableModel) => void;

	constructor(private modalCtrl: ModalController) {}

	public async onClickSave() {
		if (!this.model.id) {
			throw new Error("Invalid state");
		}
		this.onUpdate(this.model);
		await this.modalCtrl.dismiss({
			dismissed: true,
		});
	}

	public async onClickCreate() {
		this.onCreate(this.model);
		await this.modalCtrl.dismiss({
			dismissed: true,
		});
	}

	public async onClickClose() {
		await this.modalCtrl.dismiss({
			dismissed: true,
		});
	}
}
