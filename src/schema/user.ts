import { builder } from '~/builder';

builder.prismaObject('User', {
	fields: t => ({
		id: t.exposeInt('id'),
	}),
});
