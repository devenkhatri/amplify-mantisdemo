// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Statuses = {
  "PENDING": "PENDING",
  "APPROVED": "APPROVED",
  "REJECTED": "REJECTED"
};

const { Orders } = initSchema(schema);

export {
  Orders,
  Statuses
};