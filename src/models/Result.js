import {members} from "../../main.js";

export class Result{
	#_date;
	discipline;
	#_member;
	type;
	#_time;
	id;

	/**
	 * Result constructor
	 * @param {ResultData} resultDetails
	 */
	constructor(resultDetails) {
		this.date = resultDetails.date;
		this.member = resultDetails.memberId;
		this.time = resultDetails.time;
		Object.defineProperties(this, {
			id:{
				value: resultDetails.id || undefined,
				writable: false,
				enumerable: true
			},
			discipline: {
				value: resultDetails.discipline,
				enumerable: true
			},
			type: {
				value: resultDetails.resultType,
				enumerable: true
			}
		});
	}

	get date(){
		return this.#_date;
	}
	set date(dateString){
		this.#_date = new Date(dateString);
	}

	get member(){
		return this.#_member;
	}
	set member(memberID){
		const member = members.find(member => member.id === memberID);
		if(member) this.#_member = member;
	}

	get time(){
		const minutes = Math.floor(this.#_time/60/1000);
		const seconds = Math.floor((this.#_time%(60*1000))/1000);
		const centiseconds = (this.#_time % 100);
		const paddedMinutes = String(minutes).padStart(2, "0");
		const paddedSeconds = String(seconds).padStart(2, "0");
		return paddedMinutes + ":" + paddedSeconds + "." + centiseconds;
	}
	set time(time){
		const minutes = Number(time.split(":")[0]);
		const seconds = Number(time.substring(time.indexOf(":")+1, time.indexOf(".")));
		const ms = Number(time.split(".")[1].padEnd(3, "0"));
		this.#_time = minutes*60*1000 + seconds*1000 + ms;
	}
	get timeInMilliseconds(){
		return this.#_time;
	}
	get isTraining(){
		return this.type === "training";
	}
	get isCompetition(){
		return this.type === "competition";
	}

}