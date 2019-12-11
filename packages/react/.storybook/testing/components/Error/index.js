import React from 'react';

const Error = ({ error }) => {
  return (
    <div style={{ padding: 50, margin: '0 auto', width: 300 }}>
      <h3 style={{ color: '#ec5d5d' }}>Oops..!</h3>
      <p>An error has occured fetching the post.</p>
      <pre>
        <code>{JSON.stringify(error)}</code>
      </pre>
    </div>
  );
};

export default Error;
