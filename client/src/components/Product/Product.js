import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchProductById} from '../../store/modules/products/actions';
import Loader from '../Loader';
import ProductCarousel from './ProductCarousel';
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from 'classnames';
import {getNounReviews} from "../../utils/getNoun";

const formatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });

function Product({ product, fetchProductById, match }) {
  useEffect(() => {
    fetchProductById(match.params.id);
  }, [match.params.id]);
  
  const [activeTab, setActiveTab] = useState('characteristics');
  
  function toggle(tab) {
    if(activeTab !== tab) setActiveTab(tab);
  }

  if (product.fetching || !product.product) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5">
          <ProductCarousel images={product.product.images} />
        </div>
        <div className="col-lg-5">
          <div className="product-info">
            <h3 className="h5">{product.product.title}</h3>
            <div className="rate my-2">
              {new Array(5).fill('').map((el, i) => (
                <i key={i} className={`icon-star${i < product.product.rating ? ' checked' : ''}`} />
              ))}
              <span className="rate-amount ml-2">
                {`${product.product.reviews.length} ${getNounReviews(product.product.reviews.length)}`}
              </span>
            </div>
            <div className="row flex-column-reverse flex-lg-row">
              <div className="col-md-7">
                <p className="d-none d-lg-block">
                  {product.product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <h4 className="col-title price-text mb-2 mt-0">{formatter.format(product.product.price)}</h4>
          <Link to={`/checkout/${product.product.id}`} className="btn btn-primary btn-lg">Купить</Link>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-lg-7 offset-lg-5">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'characteristics' })}
                onClick={() => { toggle('characteristics'); }}>
                Характеристики
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'reviews' })}
                onClick={() => { toggle('reviews'); }}>
                Отзывы
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="characteristics">
              <Row>
                <Col sm="12">
                  <dl className="row">
                    {product.product.details.map(detail => (
                      <React.Fragment>
                        <dt className="col-sm-7">{detail[0]}</dt>
                        <dd className="col-sm-5">{detail[1]}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="reviews">
              <Row>
                <Col sm="12">
                  <dl className="row">
                    {product.product.reviews.map(review => (
                      <React.Fragment>
                        <dt className="col-sm-5">
                          <p>{review.author}</p>
                          <p>
                            {new Array(5).fill('').map((el, i) => (
                              <span className={`fa fa-star${i < review.rating ? ' checked' : ''}`} />
                            ))}
                          </p>
                        </dt>
                        <dd className="col-sm-7"><p>{review.text}</p></dd>
                      </React.Fragment>
                    ))}
                  </dl>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, props) {
  return {
    product: state.products.byId[props.match.params.id] || {}
  };
}

const mapDispatchToProps = { fetchProductById };


export default connect(mapStateToProps, mapDispatchToProps)(Product);
