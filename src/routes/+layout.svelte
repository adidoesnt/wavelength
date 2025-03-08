<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
	{@render children()}
</div>
