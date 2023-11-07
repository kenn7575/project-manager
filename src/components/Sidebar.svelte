<script lang="ts">
    import {LogOut} from '../functions/firebase'
    import {user} from '../stores/userStore'
    import {userProjects} from '../stores/userDataStore'
    import type { ProjectType } from '../types/project'
    import SidebarProject from './SidebarProject.svelte'
    import {addDocument} from '../functions/firebase'

    export let currentProject: ProjectType

    async function addProject(){
        const project = {
            title: "New Project",
            dateCreated: new Date().toISOString(),
            tasks: [{id: "1", title: "Task 1", columnId: "1"}],
            columns: [{id: "1", label: "To Do"}, {id: "2", label: "In Progress"}, {id: "3", label: "Done"}],
            users: [$user.uid]
        }
        addDocument("projects",project);
    
    }
</script>

<div class="fixed bg-base-200 h-screen w-[18rem]">
    <div class="flex flex-col justify-between h-full px-3">

        <div class="flex flex-col text-center h-full  gap-8 mt-8">

            <div class="flex font-bold items-center justify-start gap-2">
                <img class="w-8 h-8 rounded-full" src="{$user?.photoURL}" alt="profile">
                <p> {$user?.displayName}</p>
               
            </div>
    
            <div class="flex flex-col gap-4 items-center w-full  overflow-y-auto">

                <div class="flex w-full justify-between px-5">
                    <p>Projects</p>
                    <button on:click={() => console.log("add project")}>
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