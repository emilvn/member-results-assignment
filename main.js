import {TabUtility} from "./src/view/TabUtility.js";
import {DataService} from "./src/services/DataService.js";
import {MemberRenderer} from "./src/view/MemberRenderer.js";
import {ResultRenderer} from "./src/view/ResultRenderer.js";
import {TableView} from "./src/view/TableView.js";

window.addEventListener("load", main);
export let members;
async function main() {
	TabUtility.initTabs();
	members = await DataService.getMembers();
	const results = await DataService.getResults();
	const MemberTableView = new TableView(members, document.querySelector("#members"), MemberRenderer);
	const ResultTableView = new TableView(results, document.querySelector("#results"), ResultRenderer);
	MemberTableView.init();
	ResultTableView.init();
}