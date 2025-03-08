import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const schema = z.object({
	username: z.string().min(1, 'Username is required'),
	password: z.string().min(1, 'Password is required'),
	'remember-me': z.boolean().optional()
});

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const result = schema.safeParse({
			...data,
			'remember-me': formData.has('remember-me')
		});

		if (!result.success) {
			return fail(400, {
				error: 'Invalid form data',
				errors: result.error.flatten().fieldErrors,
				data: {
					username: data.username,
					rememberMe: formData.has('remember-me')
				}
			});
		}

		try {
			// TODO: Add authentication logic here

			return {
				success: true
			};
		} catch (error) {
			console.error(error);

			return fail(500, {
				error: 'Failed to login',
				errors: {
					username: 'Invalid username or password',
					password: 'Invalid username or password'
				},
				data: {
					username: data.username,
					rememberMe: formData.has('remember-me')
				}
			});
		}
	}
} satisfies Actions;
