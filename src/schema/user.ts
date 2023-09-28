import { builder } from '~/builder';
import { prisma } from '~/db';

builder.prismaObject('User', {
	fields: t => ({
		id: t.exposeInt('id'),
		name: t.exposeString('name', { nullable: true }),
	}),
});

builder.queryFields(t => ({
	listUsers: t.prismaField({
		type: ['User'],
		resolve: query => prisma.user.findMany(query),
	}),
}));

builder.mutationFields(t => ({
	createUser: t.prismaField({
		type: 'User',
		args: {
			name: t.arg.string({ required: true }),
		},
		resolve: (query, parent, args) => {
			return prisma.user.create({
				...query,
				data: {
					name: args.name,
				},
			});
		},
	}),
}));
