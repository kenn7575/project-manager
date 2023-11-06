<script>
  import './app.css'
  import {LogOut} from './functions/firebase'
  import Restricted from './components/restricted.svelte';
  import { isDoneLoadingStore } from "./stores/loadingStore";

  
</script>

<main class="flex min-h-screen justify-center items-center">
  {#if $isDoneLoadingStore}
  <Restricted>
    <!-- app -->
    <button on:click={LogOut}>
      sign out
    </button>
  </Restricted>
  {:else}
    <span class="loading loading-spinner loading-lg"></span>
  {/if}
</main>