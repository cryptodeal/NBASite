<script>
  import { getContext } from 'svelte';
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
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
  let n;
	function _onCancel() {
		onCancel();
		close();
  }
  function updateUser(){
    return fetch(`admin/users.json`, {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        updated: updated
      })
    }).then(res => {
      return res.status === 401 ? notifier.danger(`Authentication expired`)
      : res.status === 409 ? notifier.danger(`Failed to update user`)
      : res.status === 500 ? notifier.danger(`Server error`)
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

<NotificationDisplay bind:this={n} />
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
