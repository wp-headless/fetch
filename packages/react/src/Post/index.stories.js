import React from 'react';
import Post from 'testing/components/Post';
import Nester from 'testing/components/Nester';
import Loading from 'testing/components/Loading';
import Error from 'testing/components/Error';
import ClientProvider from '../ClientProvider';
import withPost from './withPost';
import PostProvider from '.';

export default { title: 'PostProvider' };

export const contextFunction = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <PostProvider id="1">{context => <Post {...context} />}</PostProvider>
    </ClientProvider>
  );
};

const WrappedContainer = withPost(Post);

export const loadingFallback = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <PostProvider id="1" fallback={<Loading />}>
        <p>Refresh to see loading.</p>
        <WrappedContainer />
      </PostProvider>
    </ClientProvider>
  );
};

export const errorFallback = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <PostProvider id="9999999" failed={<Error />}>
        <WrappedContainer />
      </PostProvider>
    </ClientProvider>
  );
};

export const fetchBySlug = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <PostProvider slug="hello-world">
        <WrappedContainer />
      </PostProvider>
    </ClientProvider>
  );
};
