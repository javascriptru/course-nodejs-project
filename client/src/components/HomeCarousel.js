import React, { Component } from 'react';

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators
} from 'reactstrap';

import { Link } from 'react-router-dom';

const items = [
    {
        id: '0',
        slug: 'kompyutery-noutbuki-i-po',
        captionTitle: 'Компьютеры, ноутбуки и ПО',
        captionBtnText: 'Смотреть предложения',
        captionBtnIconSrc: '/assets/icons/icon-angle-white.svg',
        backgroundImage: '/assets/images/carousel-laptop.png',
    },
    {
        id: '1',
        slug: 'smartfony-i-gadzhety',
        captionTitle: 'Смартфоны и гаджеты',
        captionBtnText: 'Смотреть предложения',
        captionBtnIconSrc: '/assets/icons/icon-angle-white.svg',
        backgroundImage: '/assets/images/carousel-phone.png',
    },
    {
        id: '2',
        slug: 'igry-i-xobbi',
        captionTitle: 'Игры и хобби',
        captionBtnText: 'Смотреть предложения',
        captionBtnIconSrc: '/assets/icons/icon-angle-white.svg',
        backgroundImage: '/assets/images/carousel-console.png',
    }
];

class HomeCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;
        const { categories } = this.props;
        
        const slides = items.map((item) => {
            const subcategory = categories.reduce((result, category) => {
                if (result) return result;
                const s = category.subcategories.find(({slug}) => slug === item.slug);
                if (s) return s;
                return result;
            }, null);
            
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    className="home-carousel-item"
                    key={item.id}
                    interval={false}
                >
                    <img className="background-image" src={item.backgroundImage} />
                    <div className="container">
                        <div className="carousel-caption">
                            <h3 className="h1">{ item.captionTitle }</h3>
                            <div>
                                <Link className="btn" to={ `/category/${subcategory.slug}` } role="button">
                                    { item.captionBtnText }
                                    <img src={ item.captionBtnIconSrc } className="ml-3" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
                className="main-carousel"
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}

export default HomeCarousel;
