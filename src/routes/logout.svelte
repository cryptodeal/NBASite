<script context="module">
  export async function preload (page, session) {
    await this.fetch('http://localhost:8000/api/session', {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
</script>

<script>
  import { goto, stores } from '@sapper/app'

  const { session } = stores()

  session.set({ authenticated: false, profile: null })

  goto('/')
</script>