export default function renderChildren(children, context) {
  if (typeof children === 'function') {
    return children(context);
  }
  return children;
}
