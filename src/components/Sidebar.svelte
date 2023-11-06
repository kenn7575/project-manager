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
                <a href={`/project/${project.id}`} class="btn-ghost bg-neutral hover:bg-base-300 rounded-lg px-5 py-2 w-full text-left font-medium">
                    <p>{project.name}</p>
                    <div class="flex gap-2">
                        <i class="fas fa-chevron-right" /> <!-- edit pen -->
                        <i class="fas fa-chevron-right" /> <!-- delete pen -->
                    </div>
                </a>
            {/each}
        </div>

        <div class="mt-auto p-10 font-bold">
            <button on:click={LogOut}>Sign out</button>
        </div>
    </div>
</div>

<style>

</style>