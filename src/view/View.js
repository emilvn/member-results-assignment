import {formatDate} from "../helpers/formatdate.js";
import {disciplinesInDanish} from "../../main.js";


export class View{
	static displayMembers(members) {
		document.querySelector("#members tbody").innerHTML = "";
		for (const member of members) {
			this.#_displayMember(member);
		}
	}

	static #_displayMember(member) {
		const memberRow = `
		<tr>
			<td>${member.name}</td>
			<td>${(member.isActive) ? "Ja" : "Nej"}</td>
			<td>${formatDate(member.birthdate)}</td>
			<td>${member.age}</td>
			<td>${(member.isJunior) ? "Junior" : "Senior"}</td>
		</tr>
		`
		document.querySelector("#members tbody")
			.insertAdjacentHTML("beforeend", memberRow);
	}

	static displayResults(results){
		document.querySelector("#results tbody").innerHTML = "";
		for(const result of results){
			this.#_displayResult(result);
		}
	}

	static #_displayResult(result){
		const resultRow = `
		<tr>
			<td>${formatDate(result.date)}</td>
			<td>${result.member?.name || "-"}</td>
			<td>${disciplinesInDanish[result.discipline]}</td>
			<td>${(result.isCompetition)?"Konkurrence":"Træning"}</td>
			<td>${result.time}</td>
		</tr>
		`
		document.querySelector("#results tbody")
			.insertAdjacentHTML("beforeend", resultRow);
	}

}
