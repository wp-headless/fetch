import React from 'react';

const Nester = ({ children }) => {
  return (
    <div style={{ padding: 30 }}>
      <h4 style={{ margin: '20px 0', color: '#888' }}>Nested Component</h4>
      <div
        style={{
          boxShadow: '3px 6px 21px 14px rgba(0,0,0,0.10)',
          padding: 80,
          margin: 80
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Nester;
