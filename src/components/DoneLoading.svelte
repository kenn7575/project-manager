<script>
    import {isDoneLoadingStore} from '../stores/loadingStore'
    //done loading will be true after the user store is created
</script>
{#if $isDoneLoadingStore}
<div class="flex justify-center items-center h-screen">
   <slot/>
</div>
{:else}
<div class="flex justify-center items-center h-screen">
    <div class="p-16 rounded-3xl bg-base-200"> 

      <span class="loading loading-spinner loading-lg"></span>
    </div>
  </div>
{/if}