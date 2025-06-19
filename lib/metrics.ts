// lib/metrics.ts
import client from 'prom-client';

export const register = new client.Registry();
client.collectDefaultMetrics({ register });

export const apiRequestDuration = new client.Histogram({
  name: 'api_request_duration_seconds',
  help: 'Duration of API requests in seconds',
  labelNames: ['route', 'method', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5]
});

register.registerMetric(apiRequestDuration);
