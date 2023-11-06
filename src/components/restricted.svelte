<script>
    import {user} from '../stores/userStore'
    $: console.log($user)
    import LoginForm from './LoginForm.svelte';
    import DoneLoading from './DoneLoading.svelte';
</script>
<!-- ? note: The user store is being created at first subscripe -->
{#if $user}
<slot/>
{:else}
<DoneLoading>
    <LoginForm />
</DoneLoading>
{/if}
    

    