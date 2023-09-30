import {formatDate} from "../helpers/formatdate.js";

export class MemberRenderer{
	item;
	constructor(Member) {
		this.item = Member;
	}
	render(){
		return `
		<tr>
			<td>${this.item.name}</td>
			<td>${(this.item.isActive) ? "aktiv" : "ikke aktiv"}</td>
			<td>${formatDate(this.item.birthdate)}</td>
			<td>${this.item.age}</td>
			<td>${(this.item.isJunior) ? "Junior" : "Senior"}</td>
		</tr>
		`
	}
	postRender(element){
		// method for adding event listeners
	}
}