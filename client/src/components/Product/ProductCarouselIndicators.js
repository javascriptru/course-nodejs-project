import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function mapToCssModules(className = '', cssModule) {
  if (!cssModule) return className;
  return className
    .split(' ')
    .map(c => cssModule[c] || c)
    .join(' ');
}

const CarouselIndicators = (props) => {
  const { items, activeIndex, cssModule, onClickHandler, className } = props;

  const listClasses = mapToCssModules(cx(className, 'carousel-indicators'), cssModule);
  const indicators = items.map((item, idx) => {
    const indicatorClasses = mapToCssModules(cx(
      { active: activeIndex === idx }
    ), cssModule);
    return (
      <li
        key={`${item.key || Object.values(item).join('')}`}
        onClick={(e) => {
          e.preventDefault();
          onClickHandler(idx);
        }}
        className={indicatorClasses}
      >
        <img src={item} alt={`indicator-img-${item.key}`} />
      </li>);
  });

  return (
    <ol className={listClasses}>
      {indicators}
    </ol>
  );
};

CarouselIndicators.propTypes = {
  items: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  cssModule: PropTypes.object,
  onClickHandler: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CarouselIndicators;