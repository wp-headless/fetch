import React, { useEffect, useState } from 'react';
import PostList from 'testing/components/PostList';
import { useClient, ClientProvider } from '.';

/**
 * Setup
 */

export default { title: 'useClient' };

const FetchPages = ({ client }) => {
  const [pages, setPages] = useState([]);
  useEffect(() => {
    const fetchPages = async () => {
      const response = await client.pages().get();
      setPages(response);
    };
    fetchPages();
  }, []);
  return <div>{pages.length > 0 && <PostList posts={pages} />}</div>;
};

/**
 * Stories
 */

export const Basic = () => {
  const client = useClient({ endpoint: 'https://demo.wp-api.org/wp-json' });
  return (
    <div>
      <h2>Pages</h2>
      <p>
        <strong>endpoint: </strong>
        {client.options.endpoint}
      </p>
      <FetchPages client={client} />
    </div>
  );
};

export const WithContext = () => {
  return (
    <div>
      <ClientProvider endpoint="https://wordpress.org/wp-json">
        <div>
          <div>
            <div>
              <Basic />
            </div>
          </div>
        </div>
      </ClientProvider>
    </div>
  );
};
