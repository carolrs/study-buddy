import React from 'react';

const Post = ({post}) => {
  return(
    <article data-cy="post" key={ post._id }>
    <p>{post.message}</p>
    <p>{post.user && post.user.username}</p>
  </article>
  )
}

export default Post;
