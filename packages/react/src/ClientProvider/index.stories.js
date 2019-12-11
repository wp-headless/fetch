import React from 'react';
import PostList from 'testing/components/PostList';
import withClient from './withClient';
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
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      {({ client }) => <Container client={client} />}
    </ClientProvider>
  );
};

const WrappedContainer = withClient(Container);

export const withClientHOC = () => {
  return (
    <ClientProvider endpoint="https://demo.wp-api.org/wp-json">
      <WrappedContainer />
    </ClientProvider>
  );
};
