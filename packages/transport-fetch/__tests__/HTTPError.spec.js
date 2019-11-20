import expect from 'expect';
import HTTPError from '../src/HTTPError';

describe('HTTPError', () => {
  it('has error message', () => {
    const response = {
      status: 422,
      statusText: 'Invalid input data'
    };
    const error = new HTTPError(response);
    expect(error.message).toBe('Invalid input data');
  });

  it('has correct name', () => {
    const response = {
      status: 422,
      statusText: 'Invalid input data'
    };
    const error = new HTTPError(response);
    expect(error.name).toBe('HTTPError');
  });

  it('assigns response as property', () => {
    const response = {
      status: 422,
      statusText: 'Invalid input data'
    };
    const error = new HTTPError(response);
    expect(error.response).toEqual(response);
    expect(error.response.status).toBe(response.status);
    expect(error.response.statusText).toBe(response.statusText);
  });
});
