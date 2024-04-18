import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class DateTimeUtil {
	public applyDateTimeFormatting = (unformattedDateTimeString: string): string => {
		return formatDate(unformattedDateTimeString, "yyyy-MM-dd'T'HH:mm:ss", "en-US");
	};
}
