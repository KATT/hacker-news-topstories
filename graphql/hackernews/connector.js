import rp from 'request-promise';
import DataLoader from 'dataloader';

// Keys are HackerNews API URLs, values are { etag, result } objects
const eTagCache = {};

const HACKERNEWS_API_ROOT = 'https://hacker-news.firebaseio.com';

export default class HackerNewsConnector {
  constructor(options = {}) {

    // Allow mocking request promise for tests
    this.rp = rp;
    if (HackerNewsConnector.mockRequestPromise) {
      this.rp = HackerNewsConnector.mockRequestPromise;
    }

    this.loader = new DataLoader(this.fetch.bind(this), {
      // The HackerNews API doesn't have batching, so we should send requests as
      // soon as we know about them
      batch: false,
    });
  }
  fetch(urls) {
    const options = {
      json: true,
      resolveWithFullResponse: true,
    };

    return Promise.all(urls.map((url) => {
      const cachedRes = eTagCache[url];

      if (cachedRes && cachedRes.eTag) {
        options.headers['If-None-Match'] = cachedRes.eTag;
      }
      return new Promise((resolve, reject) => {
        this.rp({
          uri: url,
          ...options,
        }).then((response) => {
          const body = response.body;
          eTagCache[url] = {
            result: body,
            eTag: response.headers.etag,
          };
          resolve(body);
        }).catch((err) => {
          if (err.statusCode === 304) {
            resolve(cachedRes.result);
          } else {
            reject(err);
          }
        });
      });
    }));
  }

  get(path) {
    return this.loader.load(HACKERNEWS_API_ROOT + path);
  }
}
