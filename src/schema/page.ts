import { builder } from '~/builder';
import { prisma } from '~/db';

builder.prismaObject('Page', {
	fields: t => ({
		id: t.exposeInt('id'),
		title: t.exposeString('title'),
		content: t.exposeString('content'),
		slug: t.exposeString('slug'),
	}),
});

export const PageCreateInput = builder.inputType('PageCreateInput', {
	fields: t => ({
		title: t.string({ required: true }),
		slug: t.string({ required: true }),
		content: t.string(),
	}),
});

builder.queryFields(t => ({
	pageById: t.prismaField({
		type: 'Page',
		nullable: true,
		args: {
			id: t.arg.int({ required: true }),
		},
		resolve: (query, parent, args) =>
			prisma.page.findUnique({
				...query,
				where: { id: args.id },
			}),
	}),
	listPages: t.prismaField({
		type: ['Page'],
		resolve: query => prisma.page.findMany(query),
	}),
}));

builder.mutationFields(t => ({
	createPage: t.prismaField({
		type: 'Page',
		args: {
			data: t.arg({
				type: PageCreateInput,
				required: true,
			}),
		},
		resolve: (query, parent, args) => {
			return prisma.page.create({
				...query,
				data: {
					slug: args.data.slug,
					title: args.data.title,
					content: args.data.content ?? '',
				},
			});
		},
	}),
}));
