<script>
  import './app.css'
  import {LogIn, LogOut} from './functions/firebase'
  import {userStore} from './stores/userStore'
  $: console.log($userStore)

</script>
{#if !$userStore}
<button on:click={LogIn}>
  login with google 
</button>
{:else}
<button on:click={LogOut}>
  sign out
</button>
{/if}