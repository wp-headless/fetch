import React from 'react';
import Post from 'testing/components/Post';
import Loading from 'testing/components/Loading';
import Error from 'testing/components/Error';
import ClientProvider from '../ClientProvider';
import withPost from './withPost';
import FetchProvider from '.';

export default { title: 'FetchProvider' };

const WrappedContainer = withPost(Post);

export const fetchById = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <FetchProvider
        slug="hello-world"
        fallback={<Loading />}
        failed={<Error />}
      >
        <WrappedContainer />
      </FetchProvider>
    </ClientProvider>
  );
};

export const fetchBySlug = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <FetchProvider
        slug="hello-world"
        fallback={<Loading />}
        failed={<Error />}
      >
        <WrappedContainer />
      </FetchProvider>
    </ClientProvider>
  );
};

export const fetchPage = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <FetchProvider
        slug="sample-page"
        resource="pages"
        fallback={<Loading />}
        failed={<Error />}
      >
        <WrappedContainer />
      </FetchProvider>
    </ClientProvider>
  );
};

export const fetchCustomType = () => {
  return (
    <ClientProvider endpoint="https://allblackshop.com/wp-json">
      <FetchProvider
        namespace="wp/v2"
        resource="product"
        slug="french-rugby-cap"
        fallback={<Loading />}
        failed={<Error />}
      >
        <WrappedContainer />
      </FetchProvider>
    </ClientProvider>
  );
};

export const errorFallback = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <FetchProvider id="9999999" fallback={<Loading />} failed={<Error />}>
        <WrappedContainer />
      </FetchProvider>
    </ClientProvider>
  );
};
