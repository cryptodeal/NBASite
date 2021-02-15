<script>
	export let message;
	export let direction = "right";
  console.log(message)
</script>

<p style="text-align: {direction}" >
	{message.content}
</p>