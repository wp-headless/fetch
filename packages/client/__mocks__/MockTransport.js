import 'core-js/features/promise';
import mock from 'jest-mock';

export default class Transport {
  constructor(response = {}) {
    this.response = response;
    this.resetMock();
  }

  resetMock() {
    this.request = mock.fn((input, options) => this._request());
  }

  _request() {
    return new Promise((resolve, reject) => {
      if (this.response) {
        resolve(this.response);
      }
    });
  }
}
