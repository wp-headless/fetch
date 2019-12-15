function transform(key, attributes) {
  if (attributes[key] && !attributes[key].rendered) {
    return {
      [key]: { rendered: attributes[key] }
    };
  }
  return {};
}

export default function requestToResponse(attributes) {
  return {
    ...attributes,
    ...transform('title', attributes),
    ...transform('content', attributes),
    ...transform('excerpt', attributes),
    ...transform('guid', attributes)
  };
}
