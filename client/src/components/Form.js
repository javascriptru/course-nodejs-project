import React, { useState } from 'react';
import { connect } from 'react-redux';
import { oauth } from '../store/modules/auth/actions';

function Form(props) {
  const [state, changeState] = useState({});
  
  function getOAuthLink(provider) {
    return () => props.oauthAction({provider});
  }
  
  function setValue(event) {
    changeState({
      ...state,
      [event.target.name]: event.target.value
    });
  }
  
  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={(event) => props.onSubmit(event, state)}>
            {props.errors && !!props.errors.length && props.errors.map((error, i) => (
              <div key={i} className="alert alert-danger" role="alert">
                {error}
              </div>
            ))}
            <div className="jumbotron jumbotron-light jumbotron-form">
              
              {props.fields.map(field => {
                return (
                  <div className="form-group" key={field.id}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <input type={field.type} className="form-control" id={field.id}
                           placeholder={field.placeholder}
                           name={field.name}
                           value={state[field.name] || ""} onChange={setValue} required />
                  </div>
                );
              })}
  
              <div className="form-group text-center">
                <button disabled={props.disabled} type="submit" className="btn btn-primary btn-lg">
                  {props.submitButton}
                </button>
              </div>
              
              
              <div className="form-footer mt-4 text-center">
                <props.Footer />
              </div>
            </div>
          </form>
          <div
            className="h4 text-center font-weight-normal text-uppercase my-5 d-none d-lg-block">или
          </div>
          <div className="socials mb-5">
            <a href="#" className="btn btn-primary btn-social -github" onClick={getOAuthLink('github')}>
              <i className="fab fa-github" />
              Github
            </a>
            <a href="#" className="btn btn-primary btn-social -vk"  onClick={getOAuthLink('vkontakte')}>
              <i className="fab fa-vk" />
              VK
            </a>
            <a href="#" className="btn btn-primary btn-social -twitter" onClick={getOAuthLink('yandex')}>
              <i className="fab fa-yandex" />
              Yandex
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, {
  oauthAction: oauth
})(Form);
