import React from 'react';

const Error = ({ error }) => {
  return (
    <div style={{ padding: 50, margin: '0 auto', width: 500 }}>
      <h3 style={{ color: '#ec5d5d' }}>Oops..!</h3>
      <p>An error has occured fetching the post.</p>
      <pre
        style={{
          padding: 30,
          background: '#f5f9fb',
          border: '1px solid #999',
          fontFamil: 'monospace'
        }}
      >
        {JSON.stringify(error.response, undefined, 4)}
      </pre>
    </div>
  );
};

export default Error;
