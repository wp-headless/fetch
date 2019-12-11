import React from 'react';

const PostList = ({ posts }) => {
  if (!posts) {
    return null;
  }
  return (
    <React.Fragment>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <a href={post.link} target="_blank">
              {post.title.rendered}
            </a>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default PostList;
