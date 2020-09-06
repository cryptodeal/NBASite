<script>
  import { getContext } from 'svelte';
  import UserModal from './UserModal.svelte'

  const { open } = getContext('simple-modal');
  const showUserModal = () => {
    open(UserModal);
  };
</script>
<style>
  .modallink{
    cursor: pointer;
    text-decoration: none;
		padding: 1em 0.5em;
		display: block;
  }
</style>
<section>
  <a class='modallink' href={null} on:click={showUserModal}>login/register</a>
</section>
