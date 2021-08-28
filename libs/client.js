import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'nutrition',
  apiKey: process.env.API_KEY,
});
