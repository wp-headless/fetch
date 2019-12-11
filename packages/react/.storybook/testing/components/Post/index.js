import React from 'react';

const Post = ({ post }) => {
  if (!post) {
    return null;
  }
  return (
    <div style={{ padding: 80, background: '#eee' }}>
      <div
        style={{
          padding: 30,
          background: '#fff',
          margin: '0 auto',
          width: 400
        }}
      >
        <h1>{post.title.rendered}</h1>
      </div>
    </div>
  );
};

export default Post;
