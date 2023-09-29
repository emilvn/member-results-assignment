export class DataService{
	#_endpoint;
	#_ItemModel;
	constructor(endpoint, ItemModel) {
		this.#_endpoint = endpoint;
		this.#_ItemModel = ItemModel;
	}
	async getAll() {
		const res = await fetch(this.#_endpoint);
		if (!res.ok) {
			throw await res.json();
		}
		const data = await res.json();
		if(this.#_ItemModel === undefined) {
			return data;
		}
		return data.map(item => new this.#_ItemModel(item));
	}

	async getOne(id){
		const res = await fetch(`${this.#_endpoint}/${id}`);
		if(!res.ok){
			throw await res.json();
		}
		const item = await res.json();
		if(this.#_ItemModel === undefined){
			return item;
		}
		return new this.#_ItemModel(item);
	}

	async post(Item){
		const res = await fetch(this.#_endpoint, {
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(Item)
		});
		if(!res.ok){
			throw await res.json();
		}
		return await res.json();
	}

	async update(id, Item){
		const res = await fetch(`${this.#_endpoint}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(Item)
		});
		if(!res.ok){
			throw await res.json();
		}
		return await res.json();
	}

	async delete(id){
		const res = await fetch(`${this.#_endpoint}/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type":"application/json"
			}
		});
		if(!res.ok){
			throw await res.json();
		}
		return await res.json();
	}
}
