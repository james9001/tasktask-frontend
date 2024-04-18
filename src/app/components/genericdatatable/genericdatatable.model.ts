export interface GenericDataTableState {
	models: GenericDatatableModel[];
	columns: GenericDataTableColumn[];
	pageInfo: GenericDatatablePageInfo;
}

export interface GenericDatatableModel {
	[key: string]: string;
	id: string;
}

export interface GenericDataTableColumn {
	name: string;
	realName: string;
}

export interface GenericDatatablePageInfo {
	pageSize: number;
	pageNumber: number;
	totalElements: number;
}
