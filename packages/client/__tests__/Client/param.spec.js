import expect from 'expect';
import Client from '../../src';

// describe

describe('Client.resource', () => {
  it('can return a param', () => {
    const client = new Client();
    client.params.foo = 'bar';
    expect(client.param('foo')).toBe('bar');
  });

  it('can set a param', () => {
    const client = new Client();
    client.param('test', 'foo');
    expect(client.params.test).toBe('foo');
  });

  it('can set a param object', () => {
    const client = new Client();
    client.param({ a: '1', b: '2' });
    expect(client.params).toEqual({
      a: '1',
      b: '2'
    });
  });

  it('merges complex objects', () => {
    const client = new Client();
    const params = {
      foo: 'bar',
      colors: { red: '#FF3333', blue: '#3342FF', green: '#33FF5B' },
      animals: {
        mamals: ['bears', 'cats', 'humans'],
        avian: ['swans', 'seagulls', 'eagles'],
        insects: false
      }
    };
    client.param(params);
    expect(client.params).toEqual(params);
  });

  it('has fluent interface', () => {
    const client = new Client();
    const returnValue = client.param({ a: '1', b: '2' });
    expect(returnValue).toBe(client);
  });
});
