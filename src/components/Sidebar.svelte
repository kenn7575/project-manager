<script lang="ts">
    import {LogOut} from '../functions/firebase'
    import {user} from '../stores/userStore'
    import {userProjects} from '../stores/userDataStore'
    import type { ProjectType } from '../types/project'
    import SidebarProject from './SidebarProject.svelte'

    let newProjectTitle: string

    export let currentProject: ProjectType
</script>

<div class="fixed bg-base-200 h-screen w-[18rem]">
    <div class="flex flex-col justify-between h-full px-3">

        <div class="flex flex-col text-center h-full  gap-16 mt-8">

            <div class="flex font-bold items-center justify-start gap-2">
                <img class="w-8 h-8 rounded-full" src="{$user?.photoURL}" alt="profile">
                <p> {$user?.displayName}</p>
               
            </div>
    
            <div class="flex flex-col gap-8 items-center w-full  overflow-y-auto">

                <div class="join flex w-full">
                    <input class="join-item w-full px-3 py-[0.33rem] rounded-lg bg-neutral outline-none font-semibold placeholder:opacity-60 placeholder:font-normal"
                        type="text" placeholder="New project" bind:value={newProjectTitle} />
                    <button class="join-item bg-base-300 px-3" on:click={() => {
                        // add new project to userProjects
                        console.log(newProjectTitle)
                        newProjectTitle = ""
                    }}>
                        <i class="fas fa-plus" />
                    </button>
                </div>

                {#if $userProjects != null}
                    {#each $userProjects as project}
                        <SidebarProject bind:currentProject={currentProject} project={project} />
                    {/each}
                {/if}
            </div>
        </div>

        <div class="font-bold mb-4">
            <button on:click={LogOut}>Sign out</button>
        </div>
    </div>
</div>

<style>
    .project-button {
        transition-property: all;
        transition-duration: 150ms;
        cursor: pointer;
    }
    .project-button:hover {
        transform: scale(1.25);
    }
</style>