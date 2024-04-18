import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SortType } from "@swimlane/ngx-datatable";
import { GenericDataTableState, GenericDatatableModel } from "./genericdatatable.model";

@Component({
	selector: "generic-datatable",
	templateUrl: "./genericdatatable.component.html",
	styleUrls: ["./genericdatatable.component.scss"],
})
export class GenericDataTableComponent {
	@Input() state!: GenericDataTableState;

	@Output() clickOpenEditEvent = new EventEmitter<GenericDatatableModel>();
	@Output() setPageNumberEvent = new EventEmitter<void>();

	public sort: SortType = SortType.single;

	constructor() {}

	public onClickOpenEdit(_: Event, row: GenericDatatableModel) {
		this.clickOpenEditEvent.emit(row);
	}

	public async setPage(pageInfo: NgxDatatablePageInfo) {
		this.state.pageInfo.pageNumber = pageInfo.offset!;
		this.setPageNumberEvent.emit();
	}
}

interface NgxDatatablePageInfo {
	offset?: number;
	pageSize?: number;
	limit?: number;
	count?: number;
}
