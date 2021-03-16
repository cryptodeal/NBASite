<script>
  import {socketWritableStore} from '../../components/ws/socketStore'
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
      return res.status === 400 ? notifier.danger(`File not sent in upload`)
      : res.status === 500 ? notifier.danger(`Upload failed`)
      : notifier.success(`Upload successful`)
    });
  }

</script>
<h1>Admin Dashboard</h1>
<input on:change={upload} type='file' >
