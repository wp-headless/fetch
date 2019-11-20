import 'core-js/features/promise';
import mock from 'jest-mock';
export default class MockTransport {
  constructor(responses = {}) {
    this.responses = responses;
    this.resetMocks();
  }

  resetMocks() {
    ['post', 'get', 'put', 'patch', 'delete'].forEach(verb => {
      this[verb] = mock.fn((url, data, config) => this.request(verb));
    });
  }

  request(verb) {
    return new Promise((resolve, reject) => {
      if (this.responses[verb]) {
        resolve(this.responses[verb]);
      }
    });
  }
}
