import { Component } from "@angular/core";
import {
	GenericDataTableState,
	GenericDatatableModel,
} from "src/app/components/genericdatatable/genericdatatable.model";
import { TaskData, Task } from "../../providers/task.data";
import { ModalController } from "@ionic/angular";
import { GenericdataeditPage } from "src/app/components/genericdataedit/genericdataedit.page";
import { DateTimeUtil } from "src/app/providers/date-time.util";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	public state: GenericDataTableState = {
		models: [],
		columns: [
			{ name: "Name", realName: "name", dataType: "string", readOnly: false },
			{ name: "Description", realName: "description", dataType: "string", readOnly: false },
			{ name: "Due Date", realName: "dueDate", dataType: "datetime", readOnly: false },
			{ name: "Created Date", realName: "createdDate", dataType: "datetime", readOnly: true },
			{ name: "Status", realName: "status", dataType: "string", readOnly: true },
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
		private dateTimeUtil: DateTimeUtil,
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
			dueDate: this.dateTimeUtil.applyDateTimeFormatting(new Date().toISOString()),
			createdDate: this.dateTimeUtil.applyDateTimeFormatting(new Date().toISOString()),
			status: "",
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
