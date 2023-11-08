<script lang="ts">
  import Sidebar from "../components/Sidebar.svelte";
  import { userProjects } from "../stores/userDataStore";
  import DragList from "../components/DragList.svelte";
  import { onMount } from "svelte";
  import type { ProjectType } from "../types/project";

  let currentProject: ProjectType;
  let projectId;

  function getId() {
    const url = window.location.href.split("/");

    projectId = url.pop();

    if (url.pop() !== "project") return (projectId = null);

    currentProject = $userProjects?.find((project) => project.id === projectId);
  }

  onMount(() => getId());

  $: (currentProject = $userProjects?.find(
    (project) => project.id === projectId
  )),
    getId();
</script>

<div class="flex w-full">
  <Sidebar bind:currentProject />
  {#if currentProject?.id}
    <div class="flex-grow w-4/5">
      <div class="flex flex-col text-center justify-center p-10 w-full">
        <h1>{currentProject.title}</h1>
        {#if currentProject?.columns.length > 0 && currentProject?.tasks.length > 0}
          <div class="overflow-auto max-w-full">
            <DragList data={currentProject} />
          </div>
        {/if}
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
