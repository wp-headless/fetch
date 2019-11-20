import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider, withClientData } from '../src';

const Foo = () => <span>Foo</span>;

test('it renders <Component />', () => {
  const client = new Promise(resolve => resolve({ foo: 'bar', bar: 'foo' }));

  const Connected = withClientData(client => {
    return client;
  })(Foo);

  const wrapper = mount(
    <Provider client={client}>
      <Connected testPropOne="test-1" testPropTwo="test-2" />
    </Provider>
  );

  expect(wrapper.contains(<span>Foo</span>)).toBe(true);
  expect(wrapper.find('Foo').prop('testPropOne')).toBe('test-1');
  expect(wrapper.find('Foo').prop('testPropTwo')).toBe('test-2');
});

test('it can handle returned data', () => {
  const client = new Promise(resolve => resolve({ foo: 'bar', bar: 'foo' }));

  const Connected = withClientData(client => {
    return client;
  })(Foo);

  const wrapper = shallow(<Connected />, { context: { client } });

  return wrapper
    .instance()
    .componentDidMount()
    .then(() => {
      expect(wrapper.find('Foo').prop('client')).toBe(client);
      expect(wrapper.find('Foo').prop('data')).toEqual({ foo: 'bar', bar: 'foo' });
      expect(wrapper.find('Foo').prop('error')).toBe(null);
    });
});

test('it can handle rejected data', () => {
  const client = new Promise((resolve, reject) => reject({ foo: 'bar', bar: 'foo' }));

  const Connected = withClientData(client => {
    return client;
  })(Foo);

  const wrapper = shallow(<Connected />, { context: { client } });

  return wrapper
    .instance()
    .componentDidMount()
    .then(() => {
      expect(wrapper.find('Foo').prop('client')).toBe(client);
      expect(wrapper.find('Foo').prop('error')).toEqual({ foo: 'bar', bar: 'foo' });
      expect(wrapper.find('Foo').prop('data')).toEqual({});
    });
});
