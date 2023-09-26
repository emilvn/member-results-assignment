import {initTabs} from "./src/view/tabs.js";
import {View} from "./src/view/View.js";
import {DataService} from "./src/services/DataService.js";

window.addEventListener("load", main);
export let members;
async function main() {
	initTabs();
	members = await DataService.getMembers();
	const results = await DataService.getResults();
	View.displayMembers(members);
	View.displayResults(results);
}