<script lang="ts">
  import { LogOut } from "../functions/firebase";
  import { user } from "../stores/userStore";
  import { userProjects } from "../stores/userDataStore";
  import type { ProjectType } from "../types/project";
  import SidebarProject from "./SidebarProject.svelte";
  import { addDocument } from "../functions/firebase";

  export let currentProject: ProjectType;

  let newProjectTitle = "";

  async function addProject() {
    if (newProjectTitle == "") return alert("Please enter a project name");
    const project: ProjectType  = {
      title: newProjectTitle,
      description: "",
      dateCreated: new Date(),
      tasks: [{ id: "1", title: "Task 1", dateCreated: new Date(), columnId: "1", priority: 0 }],
      columns: [
        { id: "1", label: "To Do" },
        { id: "2", label: "In Progress" },
        { id: "3", label: "Done" },
      ],
      users: [$user.uid],
    };
    const newProjectId = await addDocument("projects", project);

    newProjectTitle = "";

    window.history.replaceState("", null, "/project/" + newProjectId);
    currentProject = $userProjects?.find((project) => project.id === newProjectId);
  }
</script>

<div class="bg-base-200 h-screen w-1/5 z-40">
  <div class="flex flex-col justify-between h-full px-3 w-full">
    <div class="flex flex-col text-center h-[90%] gap-16 mt-8">
      <div class="flex font-bold items-center justify-start gap-2">
        <img class="w-8 h-8 rounded-full" src={$user?.photoURL} alt="profile" />
        <p>{$user?.displayName}</p>
      </div>

      <div class="flex flex-col items-center h-full">
        <div />
        <div class="join flex w-full mb-8">
          <input
            class="join-item w-full px-3 py-[0.33rem] rounded-lg bg-neutral outline-none font-semibold placeholder:opacity-60 placeholder:font-normal"
            type="text"
            placeholder="New project"
            bind:value={newProjectTitle}
          />
          <button class="join-item bg-base-300 px-3" on:click={addProject}>
            <i class="fas fa-plus" />
          </button>
        </div>

        {#if $userProjects != null}
          <li class="flex flex-col w-full gap-4 h-[70%] overflow-y-auto">
            {#each $userProjects as project}
              <SidebarProject bind:currentProject {project} />
            {/each}
          </li>
        {/if}
      </div>
    </div>
    <div class="font-bold mb-4">
      <button on:click={LogOut}>Sign out</button>
    </div>
  </div>
</div>

<style>
  /* width */
  ::-webkit-scrollbar {
    width: 0;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
