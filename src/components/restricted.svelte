<script>
    import {userStore} from '../stores/userStore'
    import LoginForm from './LoginForm.svelte';
</script>
    
{#if $userStore}
<slot/>
{:else}
<div class="flex justify-center items-center h-screen">
    <LoginForm />
</div>
{/if}
    

    