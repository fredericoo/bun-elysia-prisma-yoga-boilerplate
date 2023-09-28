import { builder } from '~/builder';
import { prisma } from '~/db';

builder.prismaObject('User', {
	fields: t => ({
		id: t.exposeInt('id'),
		name: t.exposeString('name', { nullable: true }),
		pages: t.relation('pages', { nullable: true }),
	}),
});

builder.queryFields(t => ({
	getUserById: t.prismaField({
		type: 'User',
		nullable: true,
		args: {
			id: t.arg.int({ required: true }),
		},
		resolve: (query, parent, args) =>
			prisma.user.findUnique({
				...query,
				where: { id: args.id },
			}),
	}),
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
