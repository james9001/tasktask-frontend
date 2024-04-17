export interface GenericDataTableState {
	models: GenericDatatableModel[];
	columns: GenericDataTableColumn[];
	pageInfo: GenericDatatablePageInfo;
}

export interface GenericDatatableModel {
	id: string; //TODO: UUID
}

export interface GenericDataTableColumn {
	name: string;
}

export interface GenericDatatablePageInfo {
	pageSize: number;
	pageNumber: number;
	totalElements: number;
}
