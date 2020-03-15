import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Card, CardTitle, CardText, CardImg, CardBody} from 'reactstrap';
import cx from 'classnames';
import {getNounReviews} from '../utils/getNoun';

const CardComponent = ({url, cardTitle, cardImgSrc, rating, reviews, cardPrice, discount}) => (
  <Card tag={Link} to={url}>
    <div className="card-img-wrap">
      <CardImg width="100%" className="card-img-top" src={cardImgSrc} alt="Card image cap"/>
    </div>
    <CardBody>
      <CardTitle>{cardTitle}</CardTitle>
      <div className="flex-grow" />
      <div className="rate">
        {new Array(5).fill('').map((el, i) => (
          <i key={i} className={`icon-star${i < rating ? ' checked' : ''}`} />
        ))}
        <span className="rate-amount ml-2">{reviews}</span>
      </div>
      <CardText className={cx("price-text", {"discount": discount})}>
        <strong>{cardPrice}</strong>
        {discount && <small className="ml-2">{discount}</small>}
      </CardText>
    </CardBody>
  </Card>
);

CardComponent.propTypes = {
  cardTitle: PropTypes.string,
  cardImgSrc: PropTypes.string,
  cardRate: PropTypes.bool,
  cardRateAmount: PropTypes.string,
  cardPrice: PropTypes.string,
  cardOldPrice: PropTypes.string,
  discount: PropTypes.bool
};

export default CardComponent;
