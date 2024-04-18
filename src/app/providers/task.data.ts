import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs/internal/lastValueFrom";
import { DateTimeUtil } from "./date-time.util";

@Injectable({
	providedIn: "root",
})
export class TaskData {
	constructor(
		private http: HttpClient,
		private dateTimeUtil: DateTimeUtil,
	) {}

	public search = async (criteria: TaskSearchRequestCriteria): Promise<TaskSearchResponse> => {
		const response = await lastValueFrom(
			this.http.post<TaskSearchResponseDto>("http://localhost:8091/api/task/search", criteria),
		);
		return {
			page: response.page,
			data: response.data.map((dto) => this.mapFromDto(dto)),
		};
	};

	public create = async (model: Task): Promise<Task> => {
		return this.mapFromDto(
			await lastValueFrom(
				this.http.post<TaskDto>("http://localhost:8091/api/task", this.mapToDto(model)),
			),
		);
	};

	public update = async (model: Task): Promise<Task> => {
		return this.mapFromDto(
			await lastValueFrom(
				this.http.put<TaskDto>("http://localhost:8091/api/task", this.mapToDto(model)),
			),
		);
	};

	private mapFromDto = (dto: TaskDto): Task => {
		const dueDate = this.dateTimeUtil.applyDateTimeFormatting(dto.dueDate.toString());
		return {
			...dto,
			dueDate: dueDate,
			createdDate: this.dateTimeUtil.applyDateTimeFormatting(dto.createdDate.toString()),
			status: this.getTaskStatus(new Date(dueDate), new Date()),
		};
	};

	private getTaskStatus = (dueDate: Date, now: Date): string => {
		if (now > dueDate) {
			return "Overdue";
		}
		const nowPlusSevenDays = new Date(now);
		nowPlusSevenDays.setDate(now.getDate() + 7);
		if (nowPlusSevenDays > dueDate) {
			return "Due soon";
		}
		return "Not urgent";
	};

	private mapToDto = (model: Task): TaskDto => {
		return {
			...model,
			dueDate: BigInt(new Date(model.dueDate).getTime()),
			createdDate: BigInt(""),
		};
	};
}

export interface Task {
	[key: string]: string;
	id: string;
	name: string;
	description: string;
	dueDate: string;
	createdDate: string;
	status: string;
}

interface TaskDto {
	id: string;
	name: string;
	description: string;
	dueDate: bigint;
	createdDate: bigint;
}

export interface TaskSearchRequestCriteria {
	pageSize: number;
	pageNumber: number;
}

export interface TaskSearchResponse {
	data: Task[];
	page: TaskSearchResponsePageInfo;
}

export interface TaskSearchResponseDto {
	data: TaskDto[];
	page: TaskSearchResponsePageInfo;
}

export interface TaskSearchResponsePageInfo {
	pageSize: number;
	pageNumber: number;
	totalElements: number;
}
