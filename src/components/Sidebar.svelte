<script lang="ts">
    import {LogOut} from '../functions/firebase'
    import {user} from '../stores/userStore'
    import {userProjects} from '../stores/userDataStore'
    import type { ProjectType } from '../types/project'
     import { projectStore } from '../stores/projectStore'// ⚠️ deprecated ⚠️
    import EditModal from './EditModal.svelte'
    let editModal;

    import DeleteModal from './DeleteModal.svelte'
    let deleteModal;
$: console.log($userProjects)
    import dummyData from '../data/projects.json'
    const projects: ProjectType[] = dummyData
</script>

<div class="fixed bg-base-200 h-screen w-[18rem]">
    <div class="flex flex-col justify-between h-full px-3">

        <div class="flex flex-col text-center h-full  gap-8 mt-8">

            <div class="flex font-bold items-center justify-start gap-2">
                <img class="w-8 h-8 rounded-full" src="{$user?.photoURL}" alt="profile">
                <p> {$user?.displayName}</p>
               
            </div>
    
            <div class="flex flex-col gap-4 items-center w-full  overflow-y-auto">
                {#each projects as project}
                    <div class="btn-ghost bg-neutral hover:bg-base-300 rounded-lg px-5 py-2 w-full text-left font-medium flex justify-between">
                        <p>{project.title}</p>
                        <div class="flex gap-6 items-center">
                            <!-- <a href={`/project/${project.uid}`}>
                                <i class="fas fa-up-right-from-square hover:text-success project-button" title="Open project"/>
                            </a> -->
                            <button on:click={() => {
                                projectStore.set(project)
                                window.history.replaceState(project, project.title, "/project/" + project.uid )
                            }} >
                                <i class="fas fa-up-right-from-square hover:text-success project-button" title="Open project"/>
                            </button>
                            <EditModal bind:modal={ editModal } project={ project } />
                            <button on:click={() => editModal.showModal()} >
                                <i class="fas fa-pen hover:text-info project-button" title="Edit project"/>
                            </button>
                            <DeleteModal bind:modal={ deleteModal } project={ project } />
                            <button on:click={() => deleteModal.showModal()} >
                                <i class="fas fa-trash-can hover:text-error project-button" title="Delete project" />
                            </button>
                        </div>
                    </div>
                {/each}
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