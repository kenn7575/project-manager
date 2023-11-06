<script>
    import {LogOut} from '../functions/firebase'

    const userProjects = [
        {
            name: 'Project 1',
            id: 1
        },
        {
            name: 'Project 2',
            id: 2
        },
        {
            name: 'Project 3',
            id: 3
        }
    ]

</script>

<div class={`fixed bg-base-200 h-screen w-[18rem]`}>
    <div class="flex flex-col text-center h-full">

        <div class="flex p-10 font-bold">
            <h1 class="center m-auto">Sidebar</h1>
        </div>

        <div class="flex flex-col gap-4 items-center w-full px-3 overflow-y-auto">
            {#each userProjects as project}
                <div class="btn-ghost bg-neutral hover:bg-base-300 rounded-lg px-5 py-2 w-full text-left font-medium flex justify-between">
                    <p>{project.name}</p>
                    <div class="flex gap-6 items-center">
                        <a href={`/project/${project.id}`}>
                            <i class="fas fa-up-right-from-square hover:text-success project-button" title="Open project"/>
                        </a>
                        <i class="fas fa-pen hover:text-info project-button" title="Edit project"/>
                        <i class="fas fa-trash-can hover:text-error project-button" title="Delete project" />
                    </div>
                </div>
            {/each}
        </div>

        <div class="mt-auto p-10 font-bold">
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