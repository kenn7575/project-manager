<script>
  export let project;
  export let currentProject;

  import EditModal from "./EditModal.svelte";
  let editModal;

  import DeleteModal from "./DeleteModal.svelte";
  let deleteModal;

  $: openProject = currentProject == project;

  let projectButton;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<ul
  on:click={(e) => {
    if (e.target != projectButton) return;
    currentProject = project;
    window.history.replaceState("", null, "/project/" + project.id);
  }}
  class={`  ${
    openProject
      ? "bg-base-300 border-2 border-gray-500 hover:border-gray-400 text-base-content"
      : "bg-neutral text-neutral-content"
  }
        hover:bg-base-300 hover:text-base-content btn-ghost mainButton rounded-lg px-5 py-2 w-full text-left font-medium flex justify-between project-button `}
  bind:this={projectButton}
>
  <p class="pointer-events-none">{project.title}</p>

  <div class="flex opacity-0 gap-6 items-center project-button-group">
    <EditModal bind:modal={editModal} bind:project />
    <button on:click={() => editModal.showModal()}>
      <i
        class="fas fa-pen hover:text-info project-button"
        title="Edit project"
      />
    </button>
    <DeleteModal bind:modal={deleteModal} bind:project />
    <button on:click={() => deleteModal.showModal()}>
      <i
        class="fas fa-trash-can hover:text-error project-button"
        title="Delete project"
      />
    </button>
  </div>
</ul>

<style>
  .project-button {
    transition-property: all;
    transition-duration: 150ms;
    /* cursor: pointer; */
  }

  .mainButton:hover .project-button-group {
    opacity: 1;
  }

  .project-button-group {
    transition: all 150ms ease-in-out;
  }
</style>
