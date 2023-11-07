<script lang="ts">
  import Sidebar from '../components/Sidebar.svelte'

  import { userProjects } from '../stores/userDataStore'
  import DragList from '../components/DragList.svelte';
  import { onMount } from 'svelte'
  import type { ProjectType } from '../types/project'

  let currentProject:  ProjectType | undefined;

  function getId() {
    let projectId

    const url = window.location.href.split('/')

    projectId = url.pop();
    
    if (url.pop() !== 'project') return projectId = null;
    if ($userProjects == null) return projectId = null;
    currentProject = $userProjects.find(project => project.id === projectId)
    }

    onMount(() => {
        getId()
    })

</script>

<div class="flex">
    <Sidebar bind:currentProject={currentProject} />
    {#if currentProject?.id}
    <div class="flex-grow pl-[18rem]">
      <div class="flex flex-col text-center justify-center p-10">
        <h1>{ currentProject.title }</h1>
        <DragList data={currentProject} />
      </div>
    </div>
    {/if}
</div>

<style>
  h1 {
    font-weight: bold;
    font-size: 3rem;
  }
</style>
