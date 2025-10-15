import { app } from './app.ts';

import { env } from './utils/env.ts';

app.listen({ port: env.PORT })
  .then(() => console.log('HTTP Server running'))
