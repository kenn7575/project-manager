<script>
    export let project
    export let currentProject

    import EditModal from "./EditModal.svelte"
    let editModal

    import DeleteModal from "./DeleteModal.svelte"
    let deleteModal
</script>

<div
    class="btn-ghost bg-neutral hover:bg-base-300 rounded-lg px-5 py-2 w-full text-left font-medium flex justify-between"
>
    <p>{project.title}</p>
    <div class="flex gap-6 items-center">
        <!-- <a href={`/project/${project.uid}`}>
            <i class="fas fa-up-right-from-square hover:text-success project-button" title="Open project"/>
        </a> -->
        <button
            on:click={() => {
                currentProject = project
                window.history.replaceState("", null, "/project/" + project.id)
            }}
        >
            <i
                class="fas fa-up-right-from-square hover:text-success project-button"
                title="Open project"
            />
        </button>
        <EditModal bind:modal={editModal} bind:project={project} />
        <button on:click={() => editModal.showModal()}>
            <i
                class="fas fa-pen hover:text-info project-button"
                title="Edit project"
            />
        </button>
        <DeleteModal bind:modal={deleteModal} bind:project={project} />
        <button on:click={() => deleteModal.showModal()}>
            <i
                class="fas fa-trash-can hover:text-error project-button"
                title="Delete project"
            />
        </button>
    </div>
</div>