import {headersToPropertiesDict} from "../helpers/headers-to-properties-dict.js";

export class ListRenderer{
	#_renderers;
	#_container;
	#_filterProperty;
	#_filterValue;
	#_sortBy;
	#_sortAscending = true;

	constructor(list, container, ItemRenderer) {
			this.#_container = container;
			this.#_renderers = list.map(item => new ItemRenderer(item));
	}
	clear(){
		this.#_container.innerHTML = "";
	}
	render(){
		this.#_renderers.forEach(ItemRenderer => {
			const html = ItemRenderer.render();
			this.#_container.insertAdjacentHTML("beforeend", html);
			if(ItemRenderer.postRender !== undefined) ItemRenderer.postRender(this.#_container.lastElementChild);
		});
	}
	filter(filterProperty, filterValue){
		this.#_filterProperty = filterProperty;
		this.#_filterValue = filterValue;
	}
	sort(sortBy){
		// get sort details from dict
		const sortDetails = headersToPropertiesDict[sortBy];
		const sortProperty = sortDetails.propertyName;
		const sortType = sortDetails.sortType;
		this.#_sortBy = sortProperty;

		// change ascending/descending
		this.#_sortAscending = !this.#_sortAscending;

		// filter out undefined properties to mitigate errors in sort
		const definedPropertyRenderers = this.#_renderers.filter(renderer => renderer.item[this.#_sortBy] !== undefined);
		const undefinedPropertyRenderers = this.#_renderers.filter(renderer => renderer.item[this.#_sortBy] === undefined);

		switch (sortType){
			case "string":
				definedPropertyRenderers.sort((a,b)=>
					(this.#_sortAscending)
						? a.item[this.#_sortBy].localeCompare(b.item[this.#_sortBy])
						: b.item[this.#_sortBy].localeCompare(a.item[this.#_sortBy])
				);
				break;
			case "number":
				definedPropertyRenderers.sort((a,b) =>
					(this.#_sortAscending)
						? a.item[this.#_sortBy] - b.item[this.#_sortBy]
						: b.item[this.#_sortBy] - a.item[this.#_sortBy]
				);
				break;
			case "objectName":
				definedPropertyRenderers.sort((a,b) =>
					(this.#_sortAscending)
						? a.item[this.#_sortBy].name.localeCompare(b.item[this.#_sortBy].name)
						: b.item[this.#_sortBy].name.localeCompare(a.item[this.#_sortBy].name)
				);
				break;
			default:
				break;
		}

		this.#_renderers = definedPropertyRenderers.concat(undefinedPropertyRenderers);
		this.clear();
		this.render();
	}
}