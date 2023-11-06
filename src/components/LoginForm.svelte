<script>
    import {LogIn,} from '../functions/firebase'
   
</script>


<div class="card w-96 bg-base-300 text-base-content">
    <div class="card-body items-center text-center">
      <h2 class="card-title">Authentication 🔑</h2>
      <p>Sign in with google to continue.</p>

        <button class="btn btn-primary" on:click={LogIn}>
            login with google 
        </button>

    </div>
  </div>
  