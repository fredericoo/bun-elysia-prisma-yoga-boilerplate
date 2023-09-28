import './page';
import './user';

import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { resolve } from 'path';

import { builder } from '../builder';

export const schema = builder.toSchema({});

writeFileSync(resolve(__dirname, '../../schema.graphql'), printSchema(schema));
