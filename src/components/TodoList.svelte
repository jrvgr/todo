<script lang="ts">
	import type { Item } from "../lib/storage";
	import { done, archived, sortedItems, reverse } from "./writeables";
	import TodoItem from "./TodoItem.svelte";
  import { slide } from "svelte/transition";

	let todoItems: Item[] = [];
	$: {
		if ($done === "all") todoItems = $sortedItems;
		if ($done === "done") todoItems = $sortedItems.filter((item) => item.done);
		if ($done === "not done")
			todoItems = $sortedItems.filter((item) => !item.done);
		if ($reverse) todoItems = [...todoItems].reverse();
	}
</script>

<div in:slide={{ duration: 1000 }} class="items">
	{#if !$archived}
		{#each todoItems.filter((item) => !item.archived) as item}
			<TodoItem {item} />
		{/each}
	{:else if $archived}
		{#each todoItems.filter((item) => item.archived) as item}
			<TodoItem {item} />
		{/each}
	{/if}
</div>
