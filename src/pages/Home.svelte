<script>
  import Sidebar from '../components/Sidebar.svelte'
  import {userData} from '../stores/userDataStore'
  import { projectStore } from '../stores/projectStore'

  import { onMount } from 'svelte';

  import { draggable, dropzone } from '../functions/elementDrag'

  let projectId;

  onMount(() => {
    const url = window.location.href.split('/')

    projectId = url.pop();

    if (url.pop() !== 'project') return projectId = null;
    projectStore.set({...$projectStore, uid: projectId})
  });
</script>

<div class="flex">
    <Sidebar />
    {#if $projectStore}
    <div class="flex-grow pl-[18rem]">
      <div class="flex flex-col text-center justify-center p-10">
        <h1>{ $projectStore.title }</h1>
        <div use:draggable={"card1"}>Card1</div>
        <div use:draggable={"card2"}>Card2</div>
        <div use:draggable={"card3"}>Card3</div>
        <div class="flex justify-around mt-10 dropzone">
          <div use:dropzone={{
            onDrop(project_id) { console.log("Todo", project_id)}
            }}>
            Todo
          </div>

          <div use:dropzone={{
            onDrop(project_id) { console.log("In progress", project_id)}
            }}>
            In Progress
          </div>

          <div use:dropzone={{
            onDrop(project_id) { console.log("Done", project_id)}
            }}>
            Done
          </div>
        </div>
      </div>
    </div>
    {/if}
</div>

<style>
  h1 {
    font-weight: bold;
    font-size: 3rem;
  }

  :global(.droppable) {
    border: 2px dashed #ccc;
  }

  :global(.droppable) * {
    pointer-events: none;
  }

  .dropzone * {
    width: 7rem;
    height: 3rem;
    @apply bg-base-200 rounded-lg;
  }
</style>