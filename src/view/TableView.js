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
		const valueSelects = filter.querySelectorAll(".filter-value select");

		propertySelect.addEventListener("change", () => {
			const filterProperty = propertySelect.value;
			filter.querySelectorAll(".filter-value").forEach(element => {
				if(!element.classList.contains("hide")) element.classList.add("hide");
			});
			filter.querySelectorAll(".filter-value>select>option")
				.forEach(option => {if(option.value === "") option.selected = true});
			if(filterProperty === ""){
				this.#_ItemListRenderer.filter();
			}
			else{
				filter.querySelector(`#${propertySelect.value}-filter-div`)
					.classList.remove("hide");

			}
		});
		valueSelects.forEach(select => select.addEventListener("change", () => {
			const filterProperty = propertySelect.value;
			this.#_ItemListRenderer.filter(filterProperty, select.value);
		}));
	}
}