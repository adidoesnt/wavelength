<script lang="ts">
	import { config } from '$lib/config';
	import { onMount } from 'svelte';

	let isHovering = $state(false);
	let canvas: HTMLCanvasElement | null = null;

	function handleLogoClick() {
		console.log('Logo clicked');
	}

	onMount(() => {
		const ctx = canvas!.getContext('2d');
		const width = (canvas!.width = window.innerWidth);
		const height = (canvas!.height = window.innerHeight);

		function drawWave(timestamp: number) {
			ctx!.clearRect(0, 0, width, height);
			ctx!.beginPath();
			ctx!.strokeStyle = 'rgba(59, 130, 246, 0.3)';
			ctx!.lineWidth = 2;

			for (let x = 0; x < width; x++) {
				const y =
					height / 2 +
					Math.sin(x / 100 + timestamp / 1000) * 50 +
					Math.sin(x / 50 + timestamp / 2000) * 25;
				if (x === 0) {
					ctx!.moveTo(x, y);
				} else {
					ctx!.lineTo(x, y);
				}
			}
			ctx!.stroke();
			requestAnimationFrame(drawWave);
		}

		requestAnimationFrame(drawWave);
	});
</script>

<div class="relative flex min-h-screen w-full flex-col items-center justify-center">
	<canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>
	<button
		id="main-logo"
		onclick={handleLogoClick}
		onmouseenter={() => (isHovering = true)}
		onmouseleave={() => (isHovering = false)}
		class="z-10 inline-block transition-all duration-300 hover:scale-110 {isHovering
			? 'animate-pulse'
			: ''}"
	>
		<h1
			class="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text pb-4 text-5xl font-bold text-transparent md:text-7xl"
		>
			{config.name}
		</h1>
	</button>
	<p class="text-xl text-gray-300 md:text-2xl">{config.description}</p>
</div>
