<script context="module">
  export async function preload (page, session) {
    const profileRes = await this.fetch(`http://localhost:8000/api/user/profile`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    });
    //const ticketRes = await this.fetch(`http://localhost:8000/api/auth/ws`, {
    //  method: 'GET',
    //  mode: 'cors',
    //  credentials: 'include'
    //});
		const parsedProfileRes = await profileRes.json();
    //const parsedTicketRes = await ticketRes.json();
    
		//if (profileRes.status === 200 && ticketRes.status === 201) {
    if (profileRes.status === 200) {
			return { 
        profile: session.profile,
        apps: parsedProfileRes,
        //wsTicketRes: parsedTicketRes
        }
		} else {
      return {
        profile: session.profile
      }
		}
  }
</script>

<script>
  export let profile
  export let apps
  //export let wsTicketRes
  import Modal from 'svelte-simple-modal'
  import {onMount} from 'svelte';
  import dayjs from 'dayjs'
  import ScopeContent from '../components/profile/ScopeContent.svelte'
  import ReviseAppContent from '../components/profile/ReviseAppContent.svelte'
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications'
  import Sockette from 'sockette'
  //import {createSocket} from '../components/ws/utils'
  let ws;
  let wsTest
  let n;
  let edit = false;
  let user = {
    username: profile.username,
    email: profile.email
  }
  onMount(async () => {
    ws = await new Sockette('ws://localhost:8000/ws', {
      //protocols: parsedTicketResponse.ticket,
      timeout: 5e3,
      maxAttempts: 10,
      onopen: e => console.log('Connected!', e),
      onmessage: e => console.log('Received:', e.data),
      onreconnect: e => console.log('Reconnecting...', e),
      onmaximum: e => console.log('Stop Attempting!', e),
      onclose: e => console.log('Closed!', e),
      onerror: e => console.log('Error:', e)
    });
    wsTest = (ws) => {
      ws.send('This is a test of the websocket!!!')
    }
  });
  function editProfile(){
    edit = !edit;
  }
  function saveProfile(){
    return fetch(`http://localhost:8000/api/user/profile`, {
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
<style>
table {
  border-collapse: collapse;
  width: 100%;
}
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
</style>

<NotificationDisplay bind:this={n} />
<h1>Welcome, {profile.username}</h1>
<button id="socketTest" type="button" on:click={wsTest(ws)}>Test ws.send()</button>

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
<h3>My Applications</h3>
{#if apps.length}
  <table>
    <tr>
      <th>Date Submitted</th>
      <th>Role Requested</th>
      <th>Status</th>
      <th>Review/Edit App</th>
    </tr>
    {#each apps as app}
      <tr>
        <td>{dayjs(app.dateSubmitted).format('MMM. D, YYYY')}</td>
        <td>{app.scope}</td>
        <td>{app.state}</td>
        <td>
          <Modal>
            <ReviseAppContent {app}/>
          </Modal>
        </td>
      </tr>
    {/each}
    
  </table>
{:else}
  <dl>
    <dt>No applications submitted</dt>
  </dl>
{/if}