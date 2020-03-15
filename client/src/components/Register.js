import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Form from './Form';
import { register } from '../store/modules/auth/actions';

const fields = [
  {label: 'Email', type: 'email', id: 'email', name: 'email', placeholder: 'Email'},
  {label: 'Имя', type: 'text', id: 'displayName', name: 'displayName', placeholder: 'Имя'},
  {label: 'Пароль', type: 'password', id: 'password', name: 'password', placeholder: 'Пароль'},
];

function Register({registration, registerAction}) {
  if (registration.complete) {
    return (
      <div className="container pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center border border-light p-5">
            <p className="h4 mb-4">Поздравляем, вы зарегистрированы!</p>
            <p>На указанную вами почту отправлено письмо.</p>
            <p>Для завершения регистрации, пожалуйста, перейдите по ссылке из этого письма.</p>
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  function onSubmit(event, fields) {
    event.preventDefault();
    if (registration.processing) return;
  
    registerAction(fields);
  }
  
  return (
    <Form
      disabled={registration.processing}
      title="Регистрация"
      validated={registration.errors}
      errors={registration.errors}
      onSubmit={onSubmit}
      fields={fields}
      submitButton="Создать аккаунт"
      Footer={() => (
        <p>Уже есть аккаунт?&nbsp;
          <Link to="/login">Вход</Link>
        </p>
      )} />
  );
}

function mapStateToProps(state) {
  return { registration: state.auth.registration };
}

const mapDispatchToProps = { registerAction: register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);

