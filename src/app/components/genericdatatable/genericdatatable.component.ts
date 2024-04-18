import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SortType } from "@swimlane/ngx-datatable";
import { GenericDataTableState, GenericDatatableModel } from "./genericdatatable.model";

@Component({
	selector: "generic-datatable",
	templateUrl: "./genericdatatable.component.html",
	styleUrls: ["./genericdatatable.component.scss"],
})
export class GenericDataTableComponent implements OnInit {
	@Input() state!: GenericDataTableState;

	@Output() onClickOpenEditFired = new EventEmitter<GenericDatatableModel>();
	@Output() setPageFired = new EventEmitter<void>();

	//TODO: handle sorting across pagination
	public sort: SortType = SortType.multi;

	constructor() {}

	public onClickOpenEdit(_: Event, row: GenericDatatableModel) {
		this.onClickOpenEditFired.emit(row);
	}

	public ngOnInit() {
		//TODO: Is this actually needed?
		//void this.setPage({ offset: 0 });
	}

	public async setPage(pageInfo: NgxDatatablePageInfo) {
		this.state.pageInfo.pageNumber = pageInfo.offset!;
		this.setPageFired.emit();
	}
}

interface NgxDatatablePageInfo {
	offset?: number;
	pageSize?: number;
	limit?: number;
	count?: number;
}
