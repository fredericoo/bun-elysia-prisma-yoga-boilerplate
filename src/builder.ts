import SchemaBuilder from '@pothos/core';
import PrismaPluginName from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { DateTimeResolver } from 'graphql-scalars';

import { prisma } from '~/db';

export const builder = new SchemaBuilder<{
	PrismaTypes: PrismaTypes;
	Context: Record<string, never>;
	Scalars: {
		DateTime: {
			Input: Date;
			Output: Date;
		};
	};
}>({
	plugins: [PrismaPluginName],
	prisma: {
		client: prisma,
	},
});

builder.queryType({});
builder.mutationType({});

builder.addScalarType('DateTime', DateTimeResolver, {});
