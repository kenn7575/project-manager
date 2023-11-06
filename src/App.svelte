<script>
  import './app.css'
  import Restricted from './components/restricted.svelte';
  import { isDoneLoadingStore } from "./stores/loadingStore";

  
  // import pages
  import Home from './pages/Home.svelte'
</script>

<main class="flex min-h-screen justify-center items-center">
  {#if $isDoneLoadingStore}
  <Restricted>
    <!-- app -->
    <Home />

  </Restricted>
  {:else}
    <span class="loading loading-spinner loading-lg"></span>
  {/if}
</main>