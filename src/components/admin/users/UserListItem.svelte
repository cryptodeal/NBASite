<script>
  import Grid from 'svelte-grid-responsive'
  //import EditUserModal from './EditUserModal.svelte';
	export let email;
  export let scope;
  export let _id;
  export let name;
  //export let showEditUserModal = false;
  import { getContext } from 'svelte';
  import EditUser from '../../../components/admin/users/EditUser.svelte';
  if (name == null || name == undefined){
    name = {
      first: '',
      last: ''
    }
  }
  const { open } = getContext('simple-modal');

  const showEditUser = () => {
    open(EditUser, {_id: _id, email: email, scope: scope, first: name.first, last: name.last});
  };
</script>
<style>
  @media screen and (min-width: 575px) {
    button {
      margin: 0;
      position: absolute;
      top: 50%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }
  }
  .card {
		position: inherit;
		margin: 0.5em;
		padding: 0.5em 0.5em 0.5em 3em;
		border: 1px solid #eee;
		border-radius: 4px;
		box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    height: auto;
	}
	.card::after {
		clear: both;
		display: block;
	}
</style>
  <div class='card'>
    <Grid container gutter={12}>
      <Grid xs={12} md={4} lg={4}>
        <p>{email}</p>
      </Grid>
      <Grid xs={12} md={4} lg={4}>
        <p>{scope}</p>
      </Grid>
      <Grid xs={12} md={4} lg={4}>
        <div class=button>
          <button on:click={showEditUser}>Edit</button>
        </div>
      </Grid>
    </Grid>
  </div>

