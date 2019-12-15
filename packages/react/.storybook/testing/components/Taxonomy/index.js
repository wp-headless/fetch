import React from 'react';

const Taxonomy = ({ taxonomy, fetch, isFetching }) => {
  if (!taxonomy) {
    return <p>Taxonomy not found</p>;
  }
  return (
    <div style={{ padding: 80, background: '#eee' }}>
      <div style={{ margin: '0 auto', width: 400 }}>
        <div
          style={{
            padding: 30,
            background: '#fff',
            margin: '0 0 20px 0'
          }}
        >
          <p>Name: {taxonomy.name}</p>
          <p>Slug: {taxonomy.slug}</p>
          <p>Hierarchical: {taxonomy.hierarchical ? 'yes' : 'no'}</p>
          <p>{taxonomy.description}</p>
        </div>
        <button onClick={() => fetch()}>Refresh</button>
        {isFetching && <p>Refreshing...</p>}
      </div>
    </div>
  );
};

export default Taxonomy;
