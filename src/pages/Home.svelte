<script>
  import Sidebar from '../components/Sidebar.svelte'
  import {userData} from '../stores/userDataStore'
  import { projectStore } from '../stores/projectStore'
import DragList from '../components/DragList.svelte';
  import { onMount } from 'svelte';

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
      <div>
        <h1>Project id: { $projectStore.uid }</h1>
        <DragList data={{
          columns: [
            {
              id: 1,
              label: '📫 Todo'
            },
            {
              id: 2,
              label: '✅ Done'
            }
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
