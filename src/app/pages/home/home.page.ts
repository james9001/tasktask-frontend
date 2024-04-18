import { Component } from "@angular/core";
import {
	GenericDataTableState,
	GenericDatatableModel,
} from "src/app/components/genericdatatable/genericdatatable.model";
import { TaskData, Task } from "../../providers/task.data";
import { ModalController } from "@ionic/angular";
import { GenericdataeditPage } from "src/app/components/genericdataedit/genericdataedit.page";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	public state: GenericDataTableState = {
		models: [],
		columns: [
			{ name: "Id", realName: "id" },
			{ name: "Name", realName: "name" },
			{ name: "Description", realName: "description" },
		],
		pageInfo: {
			pageSize: 10,
			pageNumber: 0,
			totalElements: -1,
		},
	};

	constructor(
		private taskData: TaskData,
		private modalController: ModalController,
	) {}

	public async loadData(): Promise<void> {
		const response = await this.taskData.search({
			pageSize: this.state.pageInfo.pageSize,
			pageNumber: this.state.pageInfo.pageNumber,
		});

		this.state.models = response.data;
		//TODO: could be buggy, improve
		this.state.pageInfo = response.page;
	}

	public async ionViewDidEnter() {
		void this.loadData();
	}

	public async onSetPageFired(): Promise<void> {
		void this.loadData();
	}

	public async onClickOpenExisting(model: GenericDatatableModel) {
		await this.openGenericDataEdit(model as Task);
	}

	public async onClickAddNew() {
		await this.openGenericDataEdit({
			id: "",
			name: "",
			description: "",
		});
	}

	private async openGenericDataEdit(model: Task) {
		const modal = await this.modalController.create({
			component: GenericdataeditPage,
			componentProps: {
				state: this.state,
				model: model,
				onCreate: this.onCreate,
				onUpdate: this.onUpdate,
			},
		});
		void modal.present();
	}

	private onCreate = async (model: Task): Promise<void> => {
		await this.taskData.create(model);
		void this.loadData();
	};

	private onUpdate = async (model: Task): Promise<void> => {
		await this.taskData.update(model);
		void this.loadData();
	};
}
