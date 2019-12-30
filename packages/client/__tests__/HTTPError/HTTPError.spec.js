import expect from 'expect';
import { HTTPError } from '../../src';

describe('HTTPError', () => {
  it('has error message', () => {
    const data = {
      status: 422,
      statusText: 'Invalid input data'
    };
    const error = new HTTPError(data);
    expect(error.message).toBe('Invalid input data');
  });

  it('has correct name', () => {
    const data = {
      status: 422,
      statusText: 'Invalid input data'
    };
    const error = new HTTPError(data);
    expect(error.name).toBe('HTTPError');
  });

  it('assigns response as property', () => {
    const data = {
      status: 422,
      statusText: 'Invalid input data'
    };
    const error = new HTTPError(data);
    expect(error.response).toEqual(data);
    expect(error.response.status).toBe(data.status);
    expect(error.response.statusText).toBe(data.statusText);
  });
});
