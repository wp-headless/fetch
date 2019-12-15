import React from 'react';
import Taxonomy from '../Taxonomy';

const TaxonomyList = ({ taxonomies, fetch, isFetching }) => {
  if (!taxonomies) {
    return <p>No taxonomies found</p>;
  }
  return (
    <div>
      {Object.keys(taxonomies).map(key => (
        <Taxonomy
          key={taxonomies[key].slug}
          taxonomy={taxonomies[key]}
          fetch={fetch}
          isFetching={isFetching}
        />
      ))}
    </div>
  );
};

export default TaxonomyList;
