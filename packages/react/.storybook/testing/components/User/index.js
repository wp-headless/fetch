import React from 'react';

const User = ({ data, fetch, update, isFetching }) => {
  if (!data) {
    return null;
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
          <h1>{data.display_name}</h1>
          <p>{data.user_email}</p>
        </div>
        <button onClick={() => fetch()}>Refresh</button>
        <button onClick={() => update({ title: 'updated!' })}>update</button>
        {isFetching && <p>Refreshing...</p>}
      </div>
    </div>
  );
};

export default User;
