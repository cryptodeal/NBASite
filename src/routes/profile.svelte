<script context="module">
  export async function preload (page, session) {
    return {
      profile: session.profile
    }
  }
</script>

<script>
  export let profile
  import Modal from 'svelte-simple-modal'
  import ScopeContent from '../components/profile/ScopeContent.svelte'
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
  let n;
  let edit = false;
  let id = profile.id
  let user = {
    username: profile.username,
    email: profile.email
  }
  function editProfile(){
    edit = !edit;
  }
  function saveProfile(){
    return fetch(`profile.json`, {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: profile.id,
        updated: user
      })
    }).then(res => {
      return res.status === 401 ? notifier.danger(`Authentication expired`)
      : res.status === 409 ? notifier.danger(`Failed to update profile`)
      : res.status === 500 ? notifier.danger(`Server error`)
      : window.location.href = `/profile`
    })
  }
</script>

<NotificationDisplay bind:this={n} />
<h1>Welcome, {profile.username}</h1>

<h2>My Profile</h2>
{#if edit == true }
<button id="edit" type="button" on:click={editProfile}>Disable Edits</button>
<dl>
  <form>
    <dt>Email:</dt>
    <dd>
      <input id="email" type="email" bind:value={user.email} />
    </dd>
    <dt>Username:</dt>
    <dd>
      <input id="username" type="text" bind:value={user.username} />
    </dd>
  </form>
</dl>
<button id="save" type="button" on:click={saveProfile}>save</button>

{:else}
<button id="edit" type="button" on:click={editProfile}>Enable Edits</button>
<dl>
  <dt>Email:</dt>
  <dd>{profile.email}</dd>
  <dt>Username:</dt>
  <dd>{profile.username}</dd>
</dl>
{/if}

<h2>My Site Permissions</h2>
<ul>
  {#each profile.scope as scope}
  <li>{scope}</li>
  {/each}
</ul>
<Modal>
  <ScopeContent {profile}/>
</Modal>