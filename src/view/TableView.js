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
		this.#_ItemListRenderer = new ListRenderer(itemList, tableElement.querySelector("tbody"), ItemRenderer);
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
		const itemFilterDiv = document.querySelector(`#${this.#_table.id}-filter`);
		const propertySelect = itemFilterDiv.querySelector(".filter-property");
		const valueSelects = itemFilterDiv.querySelectorAll(".filter-value select");

		propertySelect.addEventListener("change", () => {
			this.#_filterPropertyChange(propertySelect);
		});

		valueSelects.forEach(valueSelect =>
			valueSelect.addEventListener("change", () => {
			this.#_ItemListRenderer.filter(propertySelect.value, valueSelect.value);
		}));
	}
	#_filterPropertyChange(propertySelect) {
		const itemFilterDiv = propertySelect.parentElement;
		const filterProperty = propertySelect.value;
		const allValueSelectDivs = itemFilterDiv.querySelectorAll(".filter-value");
		const valueSelectDiv = itemFilterDiv.querySelector(`#${propertySelect.value}-filter-div`);

		allValueSelectDivs.forEach(div => {
			if (!div.classList.contains("hide")) div.classList.add("hide");
		});

		// reset options in filter value selects
		itemFilterDiv.querySelectorAll(".filter-value>select>option")
			.forEach(option =>
				option.selected = option.value === ""
			);

		if (filterProperty === "") this.#_ItemListRenderer.filter(); // no params to remove filter
		else valueSelectDiv.classList.remove("hide");
	}
}