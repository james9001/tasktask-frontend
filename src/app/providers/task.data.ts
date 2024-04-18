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

	public create = async (model: Task): Promise<Task> => {
		return lastValueFrom(this.http.post<Task>("http://localhost:8091/api/task", model));
	};

	public update = async (model: Task): Promise<Task> => {
		return lastValueFrom(this.http.put<Task>("http://localhost:8091/api/task", model));
	};
}

export interface Task {
	[key: string]: string;
	id: string;
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
