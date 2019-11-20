import Client from '../src';
import MockTransport from '../__mocks__/MockTransport';
import expect from 'expect';

describe('Client.discover', () => {
  it('requests discovery route', () => {
    const transport = new MockTransport();
    const client = new Client({ transport });
    client.discover('http://demo.wp-api.org');
    expect(client.transport.get.mock.calls[0][0]).toBe('http://demo.wp-api.org');
    expect(client.transport.get.mock.calls[0][1]).toEqual({ rest_route: '/' });
  });

  it('returns api route', () => {
    const transport = new MockTransport({
      get: {
        routes: {
          '/': {
            _links: {
              self: 'http://demo.wp-api.org/wp-json/'
            }
          }
        }
      }
    });
    const client = new Client({ transport });
    client
      .discover('http://demo.wp-api.org')
      .then(response => expect(response).toBe('http://demo.wp-api.org/wp-json/'));
  });

  it('throws Error', () => {
    const transport = new MockTransport({
      get: {}
    });
    const client = new Client({ transport });
    client.discover('http://demo.wp-api.org').catch(error => {
      expect(error instanceof Error).toBe(true);
      expect(error.message).toBe('Unable to find the REST API');
    });
  });
});
