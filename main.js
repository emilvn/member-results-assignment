import {initTabs} from "./src/view/tabs.js";
import {Member} from "./src/models/Member.js";
import {Result} from "./src/models/Result.js";
import {View} from "./src/view/View.js";

window.addEventListener("load", main);

export const disciplinesInDanish = {
	"breaststroke" : "brystsvømning",
	"backstroke" : "rygsvømning",
	"freestyle": "freestyle",
	"butterfly": "fly",
	"crawl": "crawl"
}
export let members;
async function main() {
	initTabs();
	members = await getMembers();
	const results = await getResults();
	View.displayMembers(members);
	View.displayResults(results);
}


export async function getMembers(){
	const res = await fetch("data/members.json");
	if(res.ok){
		const members = (await res.json()).map(member => new Member(member));
		members.sort((a,b) => a.name.localeCompare(b.name));
		return members;
	}
}
export async function getResults(){
	const res = await fetch("data/results.json");
	if(res.ok){
		const results = (await res.json()).map(result => new Result(result));
		results.sort((a,b)=>a.timeInMilliseconds - b.timeInMilliseconds);
		return results;
	}
}

