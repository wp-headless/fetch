import React from 'react';
import client from 'testing/client';
import Post from 'testing/components/Post';
import Nester from 'testing/components/Nester';
import Loading from 'testing/components/Loading';
import Error from 'testing/components/Error';
import withPost from './Context';
import PostProvider from '.';

export default { title: 'PostProvider' };

export const postProvider = () => {
  return (
    <PostProvider client={client} id="1">
      {({ post }) => <Post post={post} />}
    </PostProvider>
  );
};

const WrappedContainer = withPost(Post);

export const withPostHOC = () => {
  return (
    <PostProvider client={client} id="1">
      <Nester>
        <WrappedContainer />
      </Nester>
    </PostProvider>
  );
};

export const loadingFallback = () => {
  return (
    <PostProvider client={client} id="1" fallback={<Loading />}>
      <p>Refresh to see loading.</p>
      <WrappedContainer />
    </PostProvider>
  );
};

export const errorFallback = () => {
  return (
    <PostProvider client={client} id="9999999" failed={<Error />}>
      <WrappedContainer />
    </PostProvider>
  );
};
