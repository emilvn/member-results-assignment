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
		this.#_initFilter();
	}
	#_initSort(){
		const tableHeaders = this.#_table.querySelectorAll("thead th");
		tableHeaders.forEach(th => {
			th.addEventListener("click", ()=>this.#_ItemListRenderer.sort(th.textContent));
		});
	}
	#_initFilter(){
		const filter = document.querySelector(`#${this.#_table.id}-filter`);
		const propertySelect = filter.querySelector(".filter-property")
		propertySelect.addEventListener("change", () => {
			filter.querySelectorAll(".filter-value").forEach(element => {
				if(!element.classList.contains("hide")) element.classList.add("hide");
			})
			const filterProperty = propertySelect.value;
			if(filterProperty !== ""){
				const filterDiv = document.querySelector(`#${filterProperty}-filter-div`);
				const filterValueSelect = document.querySelector(`#${filterProperty}-filter`)
				filterValueSelect.addEventListener("change", () => {
					this.#_ItemListRenderer.filter(filterProperty, filterValueSelect.value);
				});
				filterDiv.classList.remove("hide");
			}
		});
	}
}