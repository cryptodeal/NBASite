<script>
  import {socketWritableStore} from '../../components/ws/socketStore'
  import { getNotificationsContext } from 'svelte-notifications';
  const { addNotification } = getNotificationsContext();
  $: console.log($socketWritableStore)
  function upload (e){
    const file = e.target.files[0]
    const fd = new FormData();
    fd.append('sampleFile', file);
    return fetch('http://localhost:8000/api/content/images/picture', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: fd
    }).then(res => {
      return res.status === 400 ? addNotification({
          text: `File Not Sent to Server`,
          position: 'bottom-center',
          type: 'danger',
          removeAfter: 4000
        })
      : res.status === 500 ? addNotification({
          text: `Upload Failed`,
          position: 'bottom-center',
          type: 'danger',
          removeAfter: 4000
        })
      : addNotification({
          text: 'Upload Successful',
          position: 'bottom-center',
          type: 'success',
          removeAfter: 4000
        })
    });
  }

</script>
<h1>Admin Dashboard</h1>
<input on:change={upload} type='file' >
