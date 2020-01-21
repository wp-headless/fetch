import React from 'react';
import expect from 'expect';
import { renderHook, act } from '@testing-library/react-hooks';
import { ClientContext } from '../../client';
import { useFetch } from '..';

/**
 * setup
 */

const client = {
  query: query => new Promise(resolve => resolve(query))
};

const wrapper = ({ children }) => (
  <ClientContext.Provider value={{ client }}>{children}</ClientContext.Provider>
);

/**
 * describe
 */

it('awaits fetching when query is false', async () => {
  await act(async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      query => useFetch(query),
      {
        wrapper,
        initialProps: false
      }
    );

    await waitForNextUpdate();

    rerender({ foo: 'bar', bar: 'foo' });

    await waitForNextUpdate();
    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current).toEqual(
      expect.objectContaining({
        isFetching: false,
        data: { foo: 'bar', bar: 'foo' }
      })
    );
  });
});

it('awaits fetching when query is a function that throws', async () => {
  await act(async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      query => useFetch(query),
      {
        wrapper,
        initialProps: () => ({ namespace: 'wc/v2', resource: Oops })
      }
    );

    await waitForNextUpdate();

    rerender(() => ({ namespace: 'wc/v2', resource: 'products' }));

    await waitForNextUpdate();
    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current).toEqual(
      expect.objectContaining({
        isFetching: false,
        data: { namespace: 'wc/v2', resource: 'products' }
      })
    );
  });
});

it('calls client.query with correct params', async () => {
  await act(async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      query => useFetch(query),
      {
        wrapper,
        initialProps: { foo: 'bar', bar: 'foo' }
      }
    );

    await waitForNextUpdate();
    await waitForNextUpdate();
    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.data).toEqual({ foo: 'bar', bar: 'foo' });
  });
});
