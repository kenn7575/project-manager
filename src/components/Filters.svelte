<script lang="ts">
  export let priorityFilter: number[] = [];

  function addFilter(ind: number) {
    priorityFilter.push(ind);
    priorityFilter = priorityFilter;
  }
  function removeFilter(ind: number) {
    priorityFilter = priorityFilter.filter((i) => i !== ind);
    priorityFilter = priorityFilter;
  }
  $: console.log(priorityFilter);
</script>

<div class="dropdown">
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label
    tabindex="0"
    class="badge badge-lg badge-outline m-1"
    class:btn-primary={priorityFilter.length > 0}>Priority</label
  >
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <ul
    tabindex="0"
    class="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-base-300"
  >
    <li>
      <div class="form-control w-full flex justify-between flex-row">
        <span class="label-text">Low</span>
        <input
          on:click={() => {
            if (priorityFilter.includes(0)) {
              removeFilter(0);
            } else {
              addFilter(0);
            }
          }}
          type="checkbox"
          checked={false}
          class="checkbox checkbox-primary"
        />
      </div>
    </li>
    <li>
      <div class="form-control w-full flex justify-between flex-row">
        <span class="label-text">Medium</span>
        <input
          on:click={() => {
            if (priorityFilter.includes(1)) {
              removeFilter(1);
            } else {
              addFilter(1);
            }
          }}
          type="checkbox"
          checked={false}
          class="checkbox checkbox-primary"
        />
      </div>
    </li>
    <li>
      <div class="form-control w-full flex justify-between flex-row">
        <span class="label-text">High</span>
        <input
          on:click={() => {
            if (priorityFilter.includes(2)) {
              removeFilter(2);
            } else {
              addFilter(2);
            }
          }}
          type="checkbox"
          checked={false}
          class="checkbox checkbox-primary"
        />
      </div>
    </li>
    <li>
      <div class="form-control w-full flex justify-between flex-row">
        <span class="label-text">Very high</span>
        <input
          on:click={() => {
            if (priorityFilter.includes(3)) {
              removeFilter(3);
            } else {
              addFilter(3);
            }
          }}
          type="checkbox"
          checked={false}
          class="checkbox checkbox-primary"
        />
      </div>
    </li>

    <button
      on:click={() => {
        priorityFilter = [];
      }}
      class="btn w-full hover:text-error"
    >
      Reset
    </button>
  </ul>
</div>
