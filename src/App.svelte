<script>
  import './app.css'
  import {LogOut} from './functions/firebase'
  import Restricted from './compenents/restricted.svelte';
  
</script>

<main class="flex min-h-screen justify-center items-center">
  <Restricted>
    <!-- app -->
    <button on:click={LogOut}>
      sign out
    </button>
  </Restricted>
</main>