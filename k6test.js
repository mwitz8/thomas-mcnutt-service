import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

let errorRate = new Rate('errorRate');

export const options = {
  thresholds: {
    'errorRate': [
      { threshold: 'rate < 0.01', abortOnFail: true, delayAbortEval: '1m' }
    ]
  },
  stages: [
    { duration: '5s', target: 100 },
    { duration: '5s', target: 150 },
    { duration: '5s', target: 200 },
  ],
};

export default function () {
  let resp = http.get('http://18.222.40.18:3000/api/location');
  errorRate.add(resp.status >= 400);
  sleep(1);
}