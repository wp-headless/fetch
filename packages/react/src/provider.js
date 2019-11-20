import React from 'react';
import invariant from 'invariant';
import PropTypes from 'prop-types';

export default class Provider extends React.Component {
  /**
   * Provider child context types.
   *
   * @var {object}
   */
  static childContextTypes = {
    client: PropTypes.object.isRequired,
  };

  /**
   * Provider prop types.
   *
   * @var {object}
   */
  static propTypes = {
    client: PropTypes.object.isRequired,
  };

  /**
   * Get child context.
   *
   * @return {object}
   */
  getChildContext() {
    return {
      client: this.props.client
    };
  }

  /**
   * Provider constructor.
   *
   * @param {object} props
   * @param {object} context
   */
  constructor(props, context) {
    super(props, context);

    invariant(
      props.client,
      'Yllet Client was not passed a client instance. Make ' +
        'sure you pass in your client via the "client" prop.',
    );
  }

  /**
   * Render Provider.
   *
   * @return {object}
   */
  render() {
    return React.Children.only(this.props.children);
  }
};
