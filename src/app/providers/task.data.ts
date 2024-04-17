import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs/internal/lastValueFrom";

@Injectable({
	providedIn: "root",
})
export class TaskData {
	constructor(private http: HttpClient) {}

	public search = async (criteria: TaskSearchRequestCriteria): Promise<TaskSearchResponse> => {
		return lastValueFrom(
			this.http.post<TaskSearchResponse>("http://localhost:8091/api/task/search", criteria),
		);
	};
}

export interface Task {
	id: string; //TODO: UUID
	name: string;
	description: string;
}

export interface TaskSearchRequestCriteria {
	pageSize: number;
	pageNumber: number;
}

export interface TaskSearchResponse {
	data: Task[];
	page: TaskSearchResponsePageInfo;
}

export interface TaskSearchResponsePageInfo {
	pageSize: number;
	pageNumber: number;
	totalElements: number;
}
