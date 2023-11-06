<script>
  import Sidebar from '../components/Sidebar.svelte'
  import {userData} from '../stores/userDataStore'
  import { projectStore } from '../stores/projectStore'

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
      </div>
    </div>
    {/if}
</div>