<script lang="ts">
	import Icon from "@iconify/svelte";
	import { items } from "../lib/storage";
	import { done, archived, reverse, sortedItems } from "./writeables";

	$: done.set(selected);
	let selected: "done" | "not done" | "all" = "all";
	let oldSelected: "done" | "not done" | "all" = "all";
	let wrapped = window.matchMedia("(max-width: 500px)").matches;

	let title: string;
	let description: string;

	function add(title: string, description: string) {
		if (!title.trim()) return;
		items.update(items.generateItem(title, description));
		items.flush();
		console.log($sortedItems);
	}

	window.addEventListener("resize", () => {
		wrapped = window.matchMedia("(max-width: 800px)").matches;
	});
</script>

<nav>
	<div class="unwrapped">
		<button
			class:active={!$archived}
			on:click={() => {
				archived.set(false);
				selected = oldSelected;
			}}
			class="home"><Icon width="17.5px" icon="lucide:home" /></button
		>
		<button
			class:active={$archived}
			on:click={() => {
				oldSelected = selected;
				archived.set(true);
				selected = "all";
				done.set("all")
			}}
			class="home"><Icon width="17.5px" icon="lucide:archive" /></button
		>
		<button on:click={() => reverse.set(!$reverse)}>
			<Icon
				width="17.5px"
				icon={$reverse ? "lucide:arrow-down-circle" : "lucide:arrow-up-circle"}
			/>
		</button>
		<button
			on:click={() => document.body.classList.toggle("dark")}
			class="darkmode"
		>
			<Icon
				width="17.5px"
				icon={document.body.classList.contains("dark")
					? "lucide:sun"
					: "lucide:moon"}
			/>
		</button>
		{#if !$archived}
			<select
				class:bigSelect={wrapped}
				bind:value={selected}
				name="done"
				id="done"
			>
				<option value="not done">Not done</option>
				<option value="done">Done</option>
				<option selected value="all">All</option>
			</select>
		{/if}

		{#if !wrapped}
			<input bind:value={title} placeholder="Title" type="text" class="title" />
			<input
				bind:value={description}
				placeholder="Description"
				type="text"
				class="description"
			/>
		{/if}
		<button on:click={() => add(title, description)} class="add"
			><Icon width="17.5px" icon="lucide:plus" /></button
		>
	</div>
	<div class="wrapped">
		{#if wrapped}
			<input bind:value={title} placeholder="Title" type="text" class="title" />
			<input
				bind:value={description}
				placeholder="Description"
				type="text"
				class="description"
			/>
		{/if}
	</div>
</nav>

<style lang="scss">
	nav {
		background-color: var(--header-background);
	}
	.unwrapped {
		display: flex;
		gap: 0.5em;
		padding: 10px;
	}

	.wrapped {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		padding-top: 0;
		.description {
			margin: 0px 10px 10px;
		}
		.title {
			margin: 0 10px;
		}
	}

	.unwrapped *,
	.wrapped * {
		min-height: 40px;
		min-width: 40px;
		border-radius: 8px;
		box-sizing: border-box;
		padding: 5px;
	}

	.description {
		flex: 1;
	}

	button {
		transition: all 0.2s;
	}

	button,
	input,
	select {
		border: none;
		background-color: var(--button-background);
		color: var(--button-foreground);
		transition: all 0.2s ease-in-out;
	}

	.bigSelect {
		flex: 1;
	}

	.active {
		color: var(--accent-blue);
	}

	@media screen and (max-width: 800px) {
		.bigSelect {
			flex: initial
		}

		.unwrapped {
			justify-content: space-evenly;
			* {
				width: 100%;
			}
		}
	}
</style>
