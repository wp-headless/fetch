import React from 'react';
import client from 'testing/client';
import PostList from 'testing/components/PostList';
import Nester from 'testing/components/Nester';
import withClient from './Context';
import ClientProvider from '.';

export default { title: 'ClientProvider' };

class Container extends React.Component {
  state = {
    pages: null
  };

  async componentDidMount() {
    const pages = await this.props.client.pages().get();
    this.setState({ pages });
  }

  render() {
    return (
      <div>
        <h2>Pages</h2>
        <PostList posts={this.state.pages} />
      </div>
    );
  }
}

export const clientProvider = () => {
  return (
    <ClientProvider client={client}>
      {({ client }) => <Container client={client} />}
    </ClientProvider>
  );
};

const WrappedContainer = withClient(Container);

export const withClientHOC = () => {
  return (
    <ClientProvider client={client}>
      <Nester>
        <WrappedContainer />
      </Nester>
    </ClientProvider>
  );
};
