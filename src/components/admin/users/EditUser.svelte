<script>
  import { getContext } from 'svelte';
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  export let onCancel = () => {};
  const { close } = getContext('simple-modal');
  export let email;
  export let scope;
  export let _id;
  export let first;
  export let last;
  let updated = {
    name: {}
  }
  let id = {_id: _id}
  if (first !== undefined && first !== null && first !== '') updated.name.first = first
  if (last !== undefined && last !== null && last !== '') updated.name.last = last
  if (scope !== undefined && scope !== null && scope !== '') updated.scope = scope
	function _onCancel() {
		onCancel();
		close();
  }
  function updateUser(){
    console.log(JSON.stringify({
        id,
        updated
      }))
    return fetch(`http://localhost:8000/api/admin/users`, {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        updated
      })
    }).then(res => {
      return res.status === 401 ? addNotification({
          text: `Authentication Expired`,
          position: 'bottom-center',
          type: 'danger',
          removeAfter: 4000
        })
      : res.status === 409 ? addNotification({
          text: `Failed to Update User`,
          position: 'bottom-center',
          type: 'danger',
          removeAfter: 4000
        })
      : res.status === 500 ? addNotification({
          text: `Server Error`,
          position: 'bottom-center',
          type: 'danger',
          removeAfter: 4000
        })
      : window.location.href= `admin/users` 

    })
  }
</script>
<style>
  h3 {
		text-align: center;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
	}
</style>

<h3>{email}</h3>
<form>
  Permissions: <select bind:value={updated.scope}>
    <option value='admin'>admin</option>
    <option value='user'>user</option>
  </select>
  <br>
  <h4>Name (or Pseudonym) for Contributors:</h4>
  <label for='firstName'>First Name</label>
  <input class='input'
    type='text'
    id='firstName'
    name='firstName'
    bind:value={updated.name.first}/>
  <br>
  <label for='lastName'>Last Name</label>
  <input class='input'
    type='text'
    id='lastName'
    name='lastName'
    bind:value={updated.name.last}/>
</form>
<div class="buttons">
  <button on:click={_onCancel}>
    Cancel
  </button>
  <button on:click={updateUser}>
    Save
  </button>
</div>
