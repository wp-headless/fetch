import React from 'react';

export default function renderChildren(children, context) {
  if (typeof children === 'function') {
    return children(context);
  }
  return React.Children.map(children, child =>
    React.cloneElement(child, context)
  );
}
