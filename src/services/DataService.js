import {Member} from "../models/Member.js";
import {Result} from "../models/Result.js";

export class DataService{
	static async getMembers() {
		const res = await fetch("data/members.json");
		if (res.ok) {
			const members = (await res.json()).map(member => new Member(member));
			members.sort((a, b) => a.name.localeCompare(b.name));
			return members;
		}
	}

	static async getResults() {
		const res = await fetch("data/results.json");
		if (res.ok) {
			const results = (await res.json()).map(result => new Result(result));
			results.sort((a, b) => a.timeInMilliseconds - b.timeInMilliseconds);
			return results;
		}
	}
}
