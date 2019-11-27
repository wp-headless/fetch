import React from 'react';
import client from './client';

export default class App extends React.Component {
  state = {
    pages: []
  };

  async componentDidMount() {
    const pages = await client.pages().get();
    this.setState({ pages });
  }

  render() {
    const { pages } = this.state;
    return (
      <div>
        <h1>Wordpress.org</h1>
        <ul>
          {pages.map(post => (
            <li key={post.id}>{post.title.rendered}</li>
          ))}
        </ul>
      </div>
    );
  }
}
