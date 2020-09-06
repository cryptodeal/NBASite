<script>
  import { getContext } from 'svelte';
  import Login from './Login.svelte'
  import Register from './Register.svelte'
  import Binder from './Binder.svelte'

  const { close } = getContext('simple-modal');
  const tabs = [
    { name: 'Login', component: Login },
    { name: 'Register', component: Register },
  ]
</script>

<Binder {tabs} />