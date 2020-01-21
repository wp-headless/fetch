import expect from 'expect';
import * as exports from '..';
import { useClient, ClientProvider } from '../hooks/client';
import { useFetch, FetchProvider, FetchContext } from '../hooks/fetch';

it('exports useClient hook', () => {
  expect(exports.useClient).toEqual(useClient);
});

it('exports ClientProvider', () => {
  expect(exports.ClientProvider).toEqual(ClientProvider);
});

it('exports useFetch hook', () => {
  expect(exports.useFetch).toEqual(useFetch);
});

it('exports FetchProvider hook', () => {
  expect(exports.FetchProvider).toEqual(FetchProvider);
});

it('exports FetchContext hook', () => {
  expect(exports.FetchContext).toEqual(FetchContext);
});
