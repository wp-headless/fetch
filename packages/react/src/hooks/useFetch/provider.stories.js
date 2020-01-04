import React, { useContext } from 'react';
import Post from 'testing/components/Post';
import FetchProvider from './Provider';
import FetchContext from './Context';

export default { title: 'Fetch Provider' };

const Page = () => {
  const { data: page } = useContext(FetchContext);
  return (
    <div>
      <h1>Page</h1>
      <Post post={page} />
    </div>
  );
};

export const PageById = () => {
  return (
    <FetchProvider resource="pages" id={2}>
      <div>
        <div>
          <Page />
        </div>
      </div>
    </FetchProvider>
  );
};
