import { Component } from "@angular/core";
import { GenericDataTableState } from "src/app/components/genericdatatable/genericdatatable.model";
import { TaskData } from "../../providers/task.data";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	public state: GenericDataTableState = {
		models: [],
		columns: [{ name: "Id" }, { name: "Name" }, { name: "Description" }],
		pageInfo: {
			pageSize: 10,
			pageNumber: 0,
			totalElements: -1,
		},
	};

	constructor(private taskData: TaskData) {}

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
}
