<script>
  import './app.css'
  import Restricted from './components/restricted.svelte';
  import { isDoneLoadingStore } from "./stores/loadingStore";

  
  // import pages
  import Home from './pages/Home.svelte'
</script>

<main class="w-screen">
  {#if $isDoneLoadingStore}
  
  <Restricted>
    <!-- app -->
    <Home />

  </Restricted>
  {:else}
  <div class="flex justify-center items-center h-screen">
    <div class="p-16 rounded-3xl bg-base-200"> 

      <span class="loading loading-spinner loading-lg"></span>
    </div>
  </div>
  {/if}
</main>