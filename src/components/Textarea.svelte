<script>
	export let name;
	export let value;
	export let size = 1;
	export let disabled;
	import { autoresize } from './autoresize.js'
</script>

<div class="field" style="--font-size: {size}rem;">
  <label htmlFor='textArea'>{name}
	  <textarea id='textArea' type="text" {disabled} {name} placeholder=" " bind:value use:autoresize autocomplete="false" style="{size > 1 && 'font-weight: bold;'}" rows="1" />
  </label>
</div>

<style>
  .field {
		--text-color: #afafaf;
    width: 100%;
    position: relative;
    border-bottom: 2px dashed var(--text-color);
    padding-top: var(--font-size);
    transition: 400ms;
  }
	.field:focus-within {
    border-bottom: 2px solid var(--text-color);
  }

  textarea {
    outline: none;
    border: none;
    overflow: hidden;
    margin: 0;
    width: 100%;
    padding: 0.25rem 0;
    background: none;
    font-size: var(--font-size);
		resize: none;
    transition: border 400ms;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;  
    }
	textarea:disabled {
		opacity: .7;
		cursor: not-allowed;;
	}
  
  label {
    color:var(--text-color);
    font-size: var(--font-size);
    z-index: -1;
    position: absolute;
    top: calc(4px + var(--font-size));
		transform-origin: 0%;
    transition: all 400ms;
  }
	
  .field:focus-within label,
  textarea:not(:placeholder-shown) + label {
    transform: scale(0.75);
    opacity: 1;
		top: 0px
  }
</style>