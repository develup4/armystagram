import React from 'react';
import { Helmet } from 'rl-react-helmet';
import Header from '../../Components/Header';
import ImageMasonry from '../../Components/PinterestStyle';
import PropTypes from 'prop-types';

const SearchPresenter = ({ loading, images }) => {
  return (
    <>
      <Header loading={loading} />
      <Helmet>
        <title>Search | Armystagram</title>
      </Helmet>
      <ImageMasonry
        numCols={5}
        containerWidth={"92%"}
        animate={true}
        scrollable={false}
        imageUrls={images}
      />
    </>
  );
};

// TODO : each image interaction

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
};

export default SearchPresenter;