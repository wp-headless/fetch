import React from 'react';

function sanitize(data) {
  return data.rendered ? data.rendered : data;
}

const Post = ({ post, refetch, update, isFetching }) => {
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
          <h1>{sanitize(post.title)}</h1>
          <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
        <button onClick={() => refetch()}>Refresh</button>
        <button
          onClick={() => update({ title: `Updated: ${post.title.rendered}` })}
        >
          Update
        </button>
        {isFetching && <p>Refreshing...</p>}
      </div>
    </div>
  );
};

export default Post;
