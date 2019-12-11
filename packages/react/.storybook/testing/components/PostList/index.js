import React from 'react';

const PostList = ({ posts }) => {
  if (!posts) {
    return null;
  }
  return (
    <React.Fragment>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>{post.title.rendered}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default PostList;
