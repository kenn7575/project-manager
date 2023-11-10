<script lang="ts">
  import Sidebar from "../components/Sidebar.svelte";
  import { userProjects } from "../stores/userDataStore";

  import DragList from "../components/DragList.svelte";
  import { onMount } from "svelte";
  import type { ProjectType } from "../types/project";
  import Filters from "../components/Filters.svelte";

  let currentProject: ProjectType;
  let projectId;

  function getId() {
    const url = window.location.href.split("/");

    projectId = url.pop();

    if (url.pop() !== "project") return (projectId = null);

    currentProject = $userProjects?.find((project) => project.id === projectId);
  }

  onMount(() => getId());

  //
  $: (currentProject = $userProjects?.find((project) => {
    return project.id === projectId;
  })),
    getId();

  //filtes
  let priorityFilter: number[] = [];
</script>

<div class="flex w-full">
  <Sidebar bind:currentProject />

  {#if currentProject?.id}
    <div class="flex-grow w-4/5">
      <div class="flex flex-col text-center justify-center p-10 w-full">
        <div class="px-2">
          <h1 class="text-start">{currentProject.title}</h1>
          <div class="divider m-0" />
          <div class="text-lg w-full flex justify-start gap-4 items-center">
            <h4 class="font-semibold">Filters</h4>
            <Filters bind:priorityFilter />
          </div>
        </div>
        {#if currentProject?.columns.length > 0 && currentProject?.tasks.length > 0}
          <div class="overflow-auto max-w-full mt-4">
            {#key $userProjects}
              <DragList data={currentProject} bind:priorityFilter />
            {/key}
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
