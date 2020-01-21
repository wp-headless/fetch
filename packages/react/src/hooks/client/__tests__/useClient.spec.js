import React from 'react';
import expect from 'expect';
import { renderHook } from '@testing-library/react-hooks';
import Client from '@wp-headless/client';
import { useClient, ClientProvider } from '..';

describe('From context', () => {
  it('retuns an instance of Client', () => {
    const wrapper = ({ children }) => (
      <ClientProvider>{children}</ClientProvider>
    );
    const { result } = renderHook(() => useClient(), { wrapper });
    expect(result.current instanceof Client).toBe(true);
  });

  it('can set endpoint', () => {
    const wrapper = ({ children }) => (
      <ClientProvider endpoint="https://foo.bar">{children}</ClientProvider>
    );
    const { result } = renderHook(() => useClient(), { wrapper });
    expect(result.current.path.endpoint).toBe('https://foo.bar');
  });

  it('can set transport', () => {
    const MockTransport = { request: () => {} };
    const wrapper = ({ children }) => (
      <ClientProvider transport={MockTransport}>{children}</ClientProvider>
    );
    const { result } = renderHook(() => useClient(), { wrapper });
    expect(result.current.transport).toBe(MockTransport);
  });
});

describe('From props', () => {
  it('retuns an instance of Client', () => {
    const { result } = renderHook(() => useClient());
    expect(result.current instanceof Client).toBe(true);
  });

  it('can set endpoint', () => {
    const { result } = renderHook(() => useClient('https://foo.bar'));
    expect(result.current.path.endpoint).toBe('https://foo.bar');
  });

  it('can set transport', () => {
    const MockTransport = { request: () => {} };
    const { result } = renderHook(() => useClient('', MockTransport));
    expect(result.current.transport).toBe(MockTransport);
  });
});
