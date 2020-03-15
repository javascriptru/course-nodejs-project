import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import ListGroupMenu from './ListGroupMenu';
import HomeCarousel from './HomeCarousel';
import Recommendations from './Recommendations';
import Loader from './Loader';

import {fetchCategories} from '../store/modules/categories/actions';
import {fetchRecommendations} from '../store/modules/products/actions';

function Home({ categories, recommendations, fetchCategories, fetchRecommendations }) {
  useEffect(() => {
    fetchCategories();
    fetchRecommendations();
  }, []);
  
  if (!categories.length || !recommendations.length) {
    return <Loader />;
  }
  
  return (
    <React.Fragment>
      <div className="backdrop"/>
      <div className="container-xl">
        <div className="row flex-column-reverse flex-lg-row">
          <div className="col-lg-3">
            <ListGroupMenu categories={categories} />
          </div>
          <div className="col-lg-9">
            <HomeCarousel categories={categories} />
          </div>
        </div>
      </div>
      <div className="container-xl">
        <div className="row justify-content-end">
          <div className="col-lg-9">
            <Recommendations items={recommendations} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return {
    categories: state.categories.items,
    recommendations: state.products.recommendations,
  };
}

const mapDispatchToProps = { fetchCategories, fetchRecommendations };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
