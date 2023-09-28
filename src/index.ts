import { Elysia } from 'elysia';
import { schema } from './schema';
import { createYoga } from 'graphql-yoga';

const app = new Elysia()
	.get('/', () => 'Hello Elysia')
	.use(app => {
		const yoga = createYoga({ schema });
		const path = '/graphql';

		const result = app
			.get(path, async ({ request }) => yoga.fetch(request))
			.post(path, async ({ request }) => yoga.fetch(request), {
				type: 'none',
			});

		return result;
	})
	.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
