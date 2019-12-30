import expect from 'expect';
import Client from '../../src';

// describe

describe('Client.param', () => {
  it('has empty globalParams by default', () => {
    const client = new Client();
    expect(client.globalParams).toEqual({});
  });

  it('can set a queryParam', () => {
    const client = new Client();
    client.param('test', 'foo');
    expect(client.globalParams.test).toBe('foo');
  });

  it('can set a queryParam object', () => {
    const client = new Client();
    client.param({ a: '1', b: '2' });
    expect(client.globalParams).toEqual({ a: '1', b: '2' });
  });

  it('merges objects', () => {
    const client = new Client();
    client.param({ a: '1', b: '2' });
    expect(client.globalParams).toEqual({ a: '1', b: '2' });
    client.param({ b: '3', c: 'd', e: 'f' });
    expect(client.globalParams).toEqual({ a: '1', b: '3', c: 'd', e: 'f' });
  });

  it('has fluent interface', () => {
    const client = new Client();
    const returnValue = client.param({ a: '1', b: '2' });
    expect(returnValue).toBe(client);
  });
});
