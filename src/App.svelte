<script lang="ts">
	import TodoList from "./components/TodoList.svelte";
	import Nav from "./components/Nav.svelte";
	import { items } from "./lib/storage";

	items.flush()
</script>

<Nav />
<TodoList />
