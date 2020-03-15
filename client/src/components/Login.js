import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Form from './Form';

import { login } from '../store/modules/auth/actions';

const fields = [
  {label: 'Email', type: 'email', id: 'email', name: 'email', placeholder: 'Email'},
  {label: 'Пароль', type: 'password', id: 'password', name: 'password', placeholder: 'Пароль'},
];

function Login({token, login, loginAction}) {
  if (token) return <Redirect to="/" />;
  
  function onSubmit(event, fields) {
    event.preventDefault();
    if (login.processing) return;
  
    loginAction(fields);
  }
  
  return (
    <Form
      disabled={login.processing}
      title="Вход"
      errors={[login.error]}
      onSubmit={onSubmit}
      fields={fields}
      submitButton="Войти"
      Footer={() => (
        <React.Fragment>
          Нет аккаунта? <Link to="/register">Регистрация</Link>
        </React.Fragment>
      )}
    />
  );
}

function mapStateToProps(state) {
  return { login: state.auth.login, token: state.auth.token };
}

const mapDispatchToProps = { loginAction: login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
