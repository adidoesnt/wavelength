<script lang="ts">
	import { config } from '$lib/config';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	type FormErrors = {
		username?: string[];
		password?: string[];
		'remember-me'?: string[];
	};

	let { form }: { form: (ActionData & { errors?: FormErrors }) | null } = $props();

	let formValues = $state({
		username: '',
		password: '',
		rememberMe: false
	});

	$effect(() => {
		if (formValues.username && form?.errors?.username) {
			form = {
				...form,
				errors: {
					...form.errors,
					username: undefined
				}
			};
		}
	});

	$effect(() => {
		if (formValues.password && form?.errors?.password) {
			form = {
				...form,
				errors: {
					...form.errors,
					password: undefined
				}
			};
		}
	});
</script>

<div class="flex min-h-screen w-full flex-col items-center justify-center p-4">
	<div class="w-full max-w-md space-y-8 rounded-2xl bg-white/10 p-8 shadow-xl backdrop-blur-lg">
		<div class="text-center">
			<h2 class="text-3xl font-bold text-white">{config.name}</h2>
			<p class="mt-2 text-sm text-gray-300">{config.pages.login.description}</p>
		</div>

		<form method="POST" use:enhance class="mt-8 space-y-6">
			<div>
				<label for="username" class="block text-sm font-medium text-gray-300">
					{config.pages.login.form.username.label}
				</label>
				<input
					type="text"
					name="username"
					id="username"
					bind:value={formValues.username}
					class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none {form
						?.errors?.username
						? 'border-red-500'
						: ''}"
					placeholder={config.pages.login.form.username.placeholder}
				/>
				{#if form?.errors?.username}
					<p class="mt-1 text-sm text-red-400">{form.errors.username}</p>
				{/if}
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-300">
					{config.pages.login.form.password.label}
				</label>
				<input
					type="password"
					name="password"
					id="password"
					bind:value={formValues.password}
					class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none {form
						?.errors?.password
						? 'border-red-500'
						: ''}"
					placeholder={config.pages.login.form.password.placeholder}
				/>
				{#if form?.errors?.password}
					<p class="mt-1 text-sm text-red-400">{form.errors.password}</p>
				{/if}
			</div>

			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						bind:checked={formValues.rememberMe}
						class="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
					/>
					<label for="remember-me" class="ml-2 block text-sm text-gray-300">
						{config.pages.login.form.rememberMe.label}
					</label>
				</div>
				<button
					type="submit"
					class="rounded-md bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-medium text-white hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					{config.pages.login.form.submit.label}
				</button>
			</div>
		</form>
	</div>
</div>
