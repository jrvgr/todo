import { sortedItems } from "../components/writeables";

class itemsManager {
	private storage: Map<string, Item>;

	constructor() {
		const parsed: [string, Item][] = JSON.parse(
			localStorage.getItem("todoItems")
		);
		this.storage = new Map(Array.isArray(parsed) ? parsed : []);
	}

	/**
	 * Add an item to the storage
	 * @param {Item} item
	 */
	update(item: Item) {
		this.storage.set(item.uuid, item);
	}

	/**
	 * Remove an item by its uuid
	 * @param {Item} item
	 */
	remove({ uuid }: Item) {
		this.storage.delete(uuid);
	}

	/**
	 * Flush the storage to localstorage and set the sorted items
	 */
	flush() {
		localStorage.setItem("todoItems", this.mapString(this.storage));
		sortedItems.set(this.sortByTime([...this.storage.values()]));
	}

	/**
	 * Get the items sorted by date
	 * @returns {Item[]} sorted items
	 */
	get() {
		return this.sortByTime([...this.storage.values()]);
	}

	/**
	 * Function to generate an item
	 * @param {string} title
	 * @param {string} description
	 * @returns {Item} full item with all key-value pairs
	 */
	generateItem(title: string, description: string): Item {
		return {
			title,
			description,
			done: false,
			archived: false,
			uuid: crypto.randomUUID(),
			date: Date.now(),
		};
	}

	/**
	 * Get a stringified version of the input
	 * @param storage Map
	 * @returns stringified version of input as array
	 */
	private mapString(storage: Map<string, Item>) {
		return JSON.stringify([...storage.entries()]);
	}

	/**
	 * Get the input array back sorted by time
	 * @param items array of the Item type
	 * @returns {Item[]} the input sorted by date
	 */
	private sortByTime(items: Item[]): Item[] {
		return [...items].sort((a, b) => a.date - b.date);
	}
}

export const items = new itemsManager();

/**
 * the type for a todo item
 */
export type Item = {
	title: string;
	description: string;
	done: boolean;
	archived: boolean;
	uuid: string;
	date: number;
};
