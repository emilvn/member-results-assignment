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
			this.#_filterPropertyChange(propertySelect)
		});

		valueSelects.forEach(filterValueSelect => filterValueSelect.addEventListener("change", () => {
			const filterProperty = propertySelect.value;
			this.#_ItemListRenderer.filter(filterProperty, filterValueSelect.value);
		}));
	}
	#_filterPropertyChange(propertySelect) {
		const itemFilterDiv = propertySelect.parentElement;
		const filterProperty = propertySelect.value;

		itemFilterDiv.querySelectorAll(".filter-value").forEach(element => {
			if (!element.classList.contains("hide")) element.classList.add("hide");
		});

		// reset options to All in filter value selects
		itemFilterDiv.querySelectorAll(".filter-value>select>option")
			.forEach(option => {
				if (option.value === "") option.selected = true
			});

		if (filterProperty === "") {
			// ListRenderer.filter called with no params to remove filter
			this.#_ItemListRenderer.filter();
		}
		else {
			itemFilterDiv.querySelector(`#${propertySelect.value}-filter-div`)
				.classList.remove("hide");

		}
	}
}