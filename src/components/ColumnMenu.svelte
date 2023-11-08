<script lang="ts">
  import type { ColumnType } from "../types/project";
  export let column: ColumnType;
  export let EditModeColumn: string;

  //create event dispatcher
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  //displatch delete column enevt
  function removeColumn(id) {
    dispatch("deleteColumn", id);
  }
  function renameColumn(id, label) {
    dispatch("renameColumn", { id, label });
  }
</script>

<div
  class="dropdown dropdown-bottom dropdown-end dropdown-hover absolute right-0 top-0 opacity-0 group-hover:opacity-100 duration-500 z-50"
  class:hidden={EditModeColumn == column.id}
>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label tabindex="0" class="btn m-1"><i class="fa-solid fa-ellipsis" /></label>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <ul
    tabindex="0"
    class="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52"
  >
    <li>
      <button
        class="text-error hover:bg-error hover:text-error-content"
        on:click={() => {
          removeColumn(column.id);
        }}
      >
        <i class="fa-solid fa-trash" /> Delete
      </button>
    </li>
    <li>
      <button
        class="hover:bg-info hover:text-info-content"
        on:click={() => {
          renameColumn(column.id, column.label);
        }}
      >
        <i class="fa-solid fa-pen" /> Rename
      </button>
    </li>
  </ul>
</div>
