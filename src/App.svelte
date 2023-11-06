<script>
  import './app.css'
  import {LogOut} from './functions/firebase'
  import {userStore} from './stores/userStore'
  import LoginForm from './compenents/LoginForm.svelte';
</script>


{#if !$userStore}
<main class="flex items-center justify-center h-screen">
  <LoginForm />
</main>
{:else}
<button on:click={LogOut}>
  sign out
</button>
{/if}