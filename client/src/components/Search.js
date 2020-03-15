import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchCategories} from '../store/modules/categories/actions';
import {fetchProductsByQuery} from '../store/modules/products/actions';
import Loader from './Loader';
import queryString from 'query-string';
import {Link} from "react-router-dom";
import ListGroupMenu from "./ListGroupMenu";
import {getNounReviews} from "../utils/getNoun";

const formatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });

function Category({ categories, products, fetchCategories, fetchProductsByQuery, location }) {
  const values = queryString.parse(location.search);
  
  useEffect(() => {
    if (values.query.length === 0) return;
    fetchProductsByQuery(values.query);
    fetchCategories();
  }, [values.query]);
  
  if (!categories.length || !products.products || products.fetching) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row">
        <ListGroupMenu categories={categories} />
        {products.products.length !== 0 &&
          <div className="d-md-inline-flex d-lg-none col-lg-8 col-xl-9">
            <h4 className="col-title mb-2 mt-2">Результаты поиска</h4>
          </div>
        }
        <div className="col-lg-8 col-xl-9">
          {products.products.length === 0 &&
            <h4 className="col-title mb-2 mt-2">{`По запросу ${values.query} ничего найти не удалось`}</h4>
          }
          {products.products.map(product => {
            return (
              <div className="product-list-box" key={product.id}>
                <div className="box-inner-col description-col">
                  <Link to={`/product/${product.id}`} className="product-img">
                    <img src={product.images[0]} alt="img" />
                  </Link>
                  <div className="product-desc">
                    <h4 className="col-title mb-2"><Link to={`/product/${product.id}`}>{product.title}</Link></h4>
                    <div>
                      {new Array(5).fill('').map((el, i) => (
                        <span className={`fa fa-star${i < product.rating ? ' checked' : ''}`} />
                      ))}
                      <span>{` ${product.reviews.length} ${getNounReviews(product.reviews.length)}`}</span>
                    </div>
                    <p className="price-text mb-0 mt-2 d-inline-block d-md-none">
                      <strong>{formatter.format(product.price)}</strong>
                    </p>
                  </div>
                </div>
                <div className="box-inner-col price-col">
                  <h4 className="col-title price-text mb-2">
                    {formatter.format(product.price)}
                  </h4>
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
  const values = queryString.parse(props.location.search);
  return {
    categories: state.categories.items,
    products: state.products.byQuery[values.query] || {}
  };
}

const mapDispatchToProps = { fetchCategories, fetchProductsByQuery };


export default connect(mapStateToProps, mapDispatchToProps)(Category);
