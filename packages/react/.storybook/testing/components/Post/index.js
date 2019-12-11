import React from 'react';
import Loading from '../Loading';

const Post = ({ post, fetchPost, fetching }) => {
  if (!post) {
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
          <h1>{post.title.rendered}</h1>
          <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
        <button onClick={() => fetchPost()}>Refresh</button>
        {fetching && <Loading />}
      </div>
    </div>
  );
};

export default Post;
