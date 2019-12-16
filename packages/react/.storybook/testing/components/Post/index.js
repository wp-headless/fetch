import React from 'react';

const Post = ({ post, fetch, update, destroy, isFetching }) => {
  if (!post) {
    return <p>Post not found</p>;
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
        <button onClick={() => fetch()}>Refresh</button>
        <button
          onClick={() => update({ title: `Updated: ${post.title.rendered}` })}
        >
          Update
        </button>
        <button onClick={() => destroy()}>Delete</button>
        {isFetching && <p>Refreshing...</p>}
      </div>
    </div>
  );
};

export default Post;
