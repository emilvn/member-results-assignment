import {ListRenderer} from "./ListRenderer.js";

export class TableView{
	#_itemList;
	#_table;
	#_ItemRenderer;
	#_ItemListRenderer;
	constructor(itemList, tableElement, ItemRenderer) {
		this.#_itemList = itemList;
		this.#_table = tableElement;
		this.#_ItemRenderer = ItemRenderer;
		this.#_ItemListRenderer = new ListRenderer(this.#_itemList, this.#_table.querySelector("tbody"), this.#_ItemRenderer);
	}
	init(){
		this.#_ItemListRenderer.render();
		this.#_initSort();
	}
	#_initSort(){
		const tableHeaders = this.#_table.querySelectorAll("thead th");
		tableHeaders.forEach(th => {
			th.addEventListener("click", ()=>this.#_ItemListRenderer.sort(th.textContent));
		});
	}
}