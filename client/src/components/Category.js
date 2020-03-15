import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCategories} from '../store/modules/categories/actions';
import {fetchProductsByCategory} from '../store/modules/products/actions';
import Loader from './Loader';
import {getNounReviews} from "../utils/getNoun";
import CategoriesSideBar from "./CategoriesSideBar";

const formatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });

function Category({ categories, products, fetchCategories, fetchProductsByCategory, match }) {
  useEffect(() => {
    fetchCategories();
    fetchProductsByCategory(match.params.category);
  }, [match.params.category]);
  
  const [selectedCategoryId, selectCategoryId] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState({});

  useEffect(() => {
    for (const category of categories) {
      const subcategory = category.subcategories.find(({slug}) => slug === match.params.category);
      if (!subcategory) continue;
      selectCategoryId(category.id);
      setSelectedSubcategory(subcategory);
      
      break;
    }
  }, [match.params.category, categories.length]);

  if (!categories.length || !products.length) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row flex-column-reverse flex-lg-row">
        <CategoriesSideBar categories={categories} categoryId={selectedCategoryId} subcategoryId={selectedSubcategory} />
        <div className="col-lg-9">
          <h3 className="h5 mt-4 mt-md-0 pt-1 mb-4">{selectedSubcategory.title}</h3>
          {products.map(product => {
            return (
              <div className="product-list-box" key={product.id}>
                <div className="box-inner-col description-col">
                  <Link to={`/product/${product.id}`} className="product-img">
                    <img src={product.images[0]} alt="img" />
                  </Link>
                  <div className="product-desc">
                    <h4 className="col-title mb-2">
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </h4>
                    <div className="rate">
                      {new Array(5).fill('').map((el, i) => (
                        <i className={`icon-star${i < product.rating ? ' checked' : ''}`} />
                      ))}
                    </div>
                    <p className="rate-amount d-none d-md-block mt-1">
                      {` ${product.reviews.length} ${getNounReviews(product.reviews.length)}`}
                    </p>
                    <p className="price-text mb-0 mt-2 d-inline-block d-md-none">
                      <strong>{formatter.format(product.price)}</strong>
                    </p>
                  </div>
                </div>
                <div className="box-inner-col price-col">
                  <h4 className="col-title price-text mb-2">{formatter.format(product.price)}</h4>
                  <div>
                    <Link to={`/checkout/${product.id}`} className="btn btn-primary btn-lg">Купить</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, props) {
  return {
    categories: state.categories.items,
    products: state.products.byCategory[props.match.params.category] || []
  };
}

const mapDispatchToProps = { fetchCategories, fetchProductsByCategory };


export default connect(mapStateToProps, mapDispatchToProps)(Category);
