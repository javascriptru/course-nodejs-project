import React from 'react';
import { CardDeck } from 'reactstrap';

import CardExample from './Card';

function Recommendations({ items }) {
  return (
    <React.Fragment>
      <h2 className="section-title text-dark">Лучшие рекомендации для вас</h2>
      <CardDeck className="homepage-cards">
        {items.map(item => {
          return (
            <CardExample
              key={item.id}
              url={`/product/${item.id}`}
              cardTitle={item.title}
              cardImgSrc={item.images[0]}
              rating={item.rating}
              reviews={item.reviews.length}
              cardPrice={item.price}
              discount={item.discount}
            />
          );
        })}
      </CardDeck>
    </React.Fragment>
  );
}

export default Recommendations;
