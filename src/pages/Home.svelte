<script>
  import Sidebar from '../components/Sidebar.svelte'
  import {userData} from '../stores/userDataStore'
  import { projectStore } from '../stores/projectStore'
import DragList from '../components/DragList.svelte';
  import { onMount } from 'svelte';

  import { draggable, dropzone } from '../functions/dragAndDrop'

  let projectId;

</script>

<div class="flex">
    <Sidebar />
    {#if $projectStore?.uid}
    <div class="flex-grow pl-[18rem]">
      <div class="flex flex-col text-center justify-center p-10">
        <h1>{ $projectStore.title }</h1>
        <DragList data={{
          columns: [
            {
              id: 1,
              label: '📝 not started'
            },
            {
              id: 2,
              label: '📫 Todo'
            },
            {
              id: 3,
              label: '📬 Doing'
            },
            {
              id: 4,
              label: '✅ Done'
            },
          ],
          cards: [
            {
              column: 1,
              id: 'a',
              title: 'Wash Dishes'
            },
            {
              column: 2,
              id: 'b',
              title: 'Code DND Example'
            }
          ]
        }} />
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
