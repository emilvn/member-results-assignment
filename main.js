import {TabUtility} from "./src/view/TabUtility.js";
import {DataService} from "./src/services/DataService.js";
import {MemberRenderer} from "./src/view/MemberRenderer.js";
import {ResultRenderer} from "./src/view/ResultRenderer.js";
import {TableView} from "./src/view/TableView.js";
import {Member} from "./src/models/Member.js";
import {Result} from "./src/models/Result.js";

window.addEventListener("load", main);
export let members;
export let results;
async function main() {
	try{
		await initData();
		initView();
	}
	catch (err){
		console.log(err);
	}
}

async function initData(){
	const MemberDataService = new DataService("data/members.json", Member);
	const ResultDataService = new DataService("data/results.json", Result);

	try{
		members = await MemberDataService.getAll();
		results = await ResultDataService.getAll();
	}
	catch (err){
		throw err;
	}
}

function initView(){
	const MemberTableView = new TableView(members, document.querySelector("#members"), MemberRenderer);
	const ResultTableView = new TableView(results, document.querySelector("#results"), ResultRenderer);

	TabUtility.initTabs();
	MemberTableView.init();
	ResultTableView.init();
}