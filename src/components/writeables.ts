import { writable, type Writable } from "svelte/store";

export const done: Writable<"all" | "not done" | "done"> = writable("not done");
export const archived = writable(false);
export const sortedItems = writable([]);
export const reverse = writable(false);
