<script>
    import {userStore} from '../stores/userStore'
    import LoginForm from './LoginForm.svelte';
</script>
    
{#if $userStore}
<slot/>
{:else}
<LoginForm />
{/if}
    

    