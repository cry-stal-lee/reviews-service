import http from 'k6/http';
import { check, sleep, group } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 250 }, // below normal load
    { duration: '30s', target: 500 }, // normal load
    { duration: '30s', target: 1000 }, // around breaking point
    { duration: '30s', target: 2000 }, // beyond breaking point
    { duration: '40s', target: 0 }, // scale down, recovery stage
  ],
};

export default function () {
  group('GET requests on render', () => {
    const product_max = 1000011;
    const product_min = 1;
    const product_id = Math.round((Math.random() * (product_max - product_min)) + product_min);

    let getReviews = http.get(`http://localhost:3000/reviews?product_id=${product_id}`);
    check(getReviews, {
      'is status 200': (response) => response.status === 200,
      'is duration < 2000ms': (response) => response.timings.duration < 2000,
    })
    sleep(1);

    let getMeta = http.get(`http://localhost:3000/reviews/meta?product_id=${product_id}`);
    check(getMeta, {
      'is status 200': (response) => response.status === 200,
      'is duration < 2000ms': (response) => response.timings.duration < 2000,
    })
    sleep(1);
  });
}
