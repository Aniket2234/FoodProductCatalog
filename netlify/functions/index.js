import serverless from 'serverless-http';
import { handler as expressApp } from '../../dist/index.js';

export const handler = serverless(expressApp);
