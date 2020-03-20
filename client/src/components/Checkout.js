import React, {useEffect, useState} from 'react';
import { Alert, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import {fetchProductById} from '../store/modules/products/actions';
import {checkout} from '../store/modules/orders/actions';
import {fetchMe} from '../store/modules/auth/actions';
import {connect} from 'react-redux';
import Loader from './Loader';

const formatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });

function Checkout({ token, product, draft, me, fetchProductById, fetchMe, checkout, match, history }) {
  useEffect(() => {
    if (!token) return history.replace('/login');
  }, [token, history]);
  
  useEffect(() => {
    if (!token) return;
    fetchMe();
    fetchProductById(match.params.id);
  }, [token, match.params.id]);
  
  const [state, setState] = useState('initial'); // 'pending'|'complete'
  
  const [phone, setPhone] = useState('+71111212123');
  const [address, setAddress] = useState('Красная площадь, Москва, Россия');
  
  useEffect(() => {
    if (draft.fetching === true) {
      setState('pending');
      return;
    }
    
    if (!!draft.errors && state === 'pending') {
      setState('initial');
      return;
    }
    
    if (!draft.errors && state === 'pending') {
      setState('complete');
    }
  }, [draft]);
  
  function onSubmit(event) {
    event.preventDefault();
    checkout({
      product: match.params.id,
      phone, address,
    });
  }
  
  function backToShop(event) {
    event.preventDefault();
    history.replace('/');
  }
  
  if (product.fetching || !product.product || me.fetching || !me.profile) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <Form onSubmit={onSubmit}>
            <h3 className="h5 mb-4 mt-4 text-md-center">Ваш заказ</h3>
            {!!draft.errors && Object.keys(draft.errors).map(error => (
              <Alert color="warning" key={error}>{draft.errors[error]}</Alert>
            ))}
            {state === 'complete' &&
              <Alert color="primary">
                Ваш заказ был оформлен. На ваш email отправлено подтверждение.
              </Alert>
            }
            <div className="product-list-box">
              <div className="box-inner-col description-col">
                <div className="product-img">
                  <img src={product.product.images[0]} alt="img" />
                </div>
                <div className="product-desc">
                  <h4 className="col-title mb-2">{product.product.title}</h4>
                  <p className="price-text mb-0 mt-2 d-inline-block d-md-none">
                    <strong>{formatter.format(product.product.price)}</strong>
                  </p>
                </div>
              </div>
              <div className="box-inner-col price-col justify-content-center">
                <p className="mb-0 font-weight-light">Total:</p>
                <h4 className="col-title price-text mb-2">{formatter.format(product.product.price)}</h4>
              </div>
            </div>
            {state !== 'complete' &&
              <React.Fragment>
                <h3 className="h5 mb-4 mt-5 text-md-center">Детали заказа</h3>
                <div className="jumbotron jumbotron-light jumbotron-form mb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="exampleInput">Имя:</Label>
                        <Input disabled value={me.profile.displayName} type="text" className="form-control" id="exampleInput" />
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Label for="exampleInput2">Email:</Label>
                        <input disabled value={me.profile.email} type="email" className="form-control" id="exampleInput2" />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label for="exampleInput3">Телефон:</Label>
                        <input value={phone} type="text" className="form-control" id="exampleInput3"
                               disabled={state === 'complete'}
                               onChange={e => setPhone(e.target.value)}
                               placeholder="+7 111 12 12 123"/>
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Label for="exampleInput4">Адрес:</Label>
                        <Input value={address} type="text" className="form-control" id="exampleInput4"
                               onChange={e => setAddress(e.target.value)}
                               disabled={state === 'complete'}
                               placeholder="Красная площадь, Москва, Россия"/>
                      </FormGroup>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-2 mb-5 my-sm-5 col-lg-4 offset-lg-4">
                  <Button disabled={state === 'complete'} type="submit" color="primary" size="lg" className="px-2 btn-block">
                    Подтвердить и оформить
                  </Button>
                </div>
              </React.Fragment>
            }
            {state === 'complete' &&
            <div className="text-center mt-2 mb-5 my-sm-5 col-lg-4 offset-lg-4">
              <Button onClick={backToShop} color="primary" size="lg" className="px-2 btn-block">
                Обратно в магазин
              </Button>
            </div>
            }
          </Form>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state, props) {
  return {
    product: state.products.byId[props.match.params.id] || {},
    draft: state.orders.draft,
    me: state.auth.me,
    token: state.auth.token,
  };
}

const mapDispatchToProps = { fetchProductById, fetchMe, checkout };


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
