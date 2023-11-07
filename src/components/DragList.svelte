<script lang="ts">
import {dropzone, draggable} from "../functions/dragAndDrop";
    export let data: any;
</script>

<ul class="list-none m-0 px-8 flex gap-4 box-border">
    {#each data.columns as column}
		{@const tasks = data.tasks.filter(c => c.columnId == column.id)}
		<li
			class="column p-4 w-1/4 h-96 max-h-full bg-base-200 rounded-lg border border-neutral-300 outline-info"
			use:dropzone={{
				on_dropzone(task_id) {
					const task = data.tasks.find(c => c.id == task_id);
					task.columnId = column.id;
					data = data;
				}
			}}
		>
			<h2 class="mb-4 font-bold">{column.label}</h2>
			{#if tasks.length > 0}
				<ul class="cards flex flex-col gap-2">
					{#each tasks as task}
						<li class={`p-4 bg-neutral rounded-lg border border-neutral-300`} use:draggable={task.id}>
							{task.title}
						</li>
					{/each}
				</ul>
			{:else}
				<p>No Tasks...</p>
			{/if}
		</li>
	{/each}
</ul>

<style>
.column:global(.droppable) {
    outline-style:dashed;
    outline-width: 2px;
    outline-offset: 4px;
}
.column:global(.droppable) * {
    pointer-events: none;
}
</style>