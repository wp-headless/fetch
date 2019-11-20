import React from 'react';
import { mount } from 'enzyme';
import { Provider, withClient } from '../src';

const Foo = ({ client }) => <span>Foo</span>;

test('has client prop', () => {
  const client = { test: true };
  const Connected = withClient(Foo);
  const wrapper = mount(
    <Provider client={client}>
      <Connected />
    </Provider>
  );

  expect(wrapper.find('Foo').prop('client')).toBe(client);
  expect(wrapper.contains(<span>Foo</span>)).toBe(true);
});
