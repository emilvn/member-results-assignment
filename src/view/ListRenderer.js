import {sortDictionary} from "../helpers/sort-dictionary.js";

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
		let renderersToRender;
		if(this.#_filterValue !== ""
			&& this.#_filterValue !== undefined
			&& this.#_filterProperty !== ""
			&& this.#_filterProperty !== undefined){
			renderersToRender = this.#_renderers.filter(renderer => String(renderer.item[this.#_filterProperty])===this.#_filterValue);
		}
		else{
			renderersToRender = this.#_renderers;
		}
		renderersToRender.forEach(ItemRenderer => {
			const html = ItemRenderer.render();
			this.#_container.insertAdjacentHTML("beforeend", html);
			if(ItemRenderer.postRender !== undefined) ItemRenderer.postRender(this.#_container.lastElementChild);
		});
	}
	filter(filterProperty, filterValue){
		this.#_filterProperty = filterProperty;
		this.#_filterValue = filterValue;
		this.clear();
		this.render();
	}
	sort(sortBy){
		this.#_sortBy = sortDictionary[sortBy].propertyName;

		// change ascending/descending
		this.#_sortAscending = !this.#_sortAscending;

		// filter out undefined properties to mitigate errors in sort
		const definedPropertyRenderers = this.#_renderers.filter(renderer => renderer.item[this.#_sortBy] !== undefined);
		const undefinedPropertyRenderers = this.#_renderers.filter(renderer => renderer.item[this.#_sortBy] === undefined);

		(this.#_sortAscending)
			? definedPropertyRenderers.sort(sortDictionary[sortBy].sortAscending)
			: definedPropertyRenderers.sort(sortDictionary[sortBy].sortDescending);


		this.#_renderers = definedPropertyRenderers.concat(undefinedPropertyRenderers);
		this.clear();
		this.render();
	}
}