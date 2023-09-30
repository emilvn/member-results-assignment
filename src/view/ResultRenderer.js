import {formatDate} from "../helpers/formatdate.js";
import {disciplinesInDanish} from "../helpers/disciplines-in-danish.js";

export class ResultRenderer{
	item;

	constructor(Result) {
		this.item = Result;
	}
	render(){
		return `
		<tr>
			<td>${formatDate(this.item.date)}</td>
			<td>${this.item.member?.name || "-"}</td>
			<td>${disciplinesInDanish[this.item.discipline]}</td>
			<td>${(this.item.isCompetition)?"Konkurrence":"Træning"}</td>
			<td>${this.item.time}</td>
		</tr>
		`
	}
	postRender(element){
		// method for adding event listeners
	}
}