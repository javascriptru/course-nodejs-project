import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { oauthCallback } from '../store/modules/auth/actions';

const providerMap = {
  vkontakte: 'VK',
  fb: 'Facebook',
  github: 'Github',
};

class OAuthCallback extends Component {
  constructor(props) {
    super(props);
  
    this.params = new URLSearchParams(props.location.search);
    this.provider = props.match.params.provider;
  }
  
  componentDidMount() {
    if (this.params.get('error')) return;
    this.props.oauthCallbackAction({code: this.params.get('code'), provider: this.provider});
  }
  
  render() {
    const { token, oauthCallback } = this.props;
    
    if (token) return <Redirect to="/" />;
    
    return (
      <main className="container">
        <div className="row login-form justify-content-center align-items-center">
          <div className="col col-md-6">
            <div className="text-center border border-light p-5">
              <p className="h4 mb-4">Логин через {providerMap[this.provider]}</p>
            
              {oauthCallback.error || this.params.get('error')
                ? <React.Fragment>
                  <p className="text-danger">При выполнени операции произошла ошибка.</p>
                  <p className="text-danger">{oauthCallback.error || ""}</p>
                  <Link to="/">Вход</Link>
                </React.Fragment>
                : <React.Fragment>
                  <p>Пожалуйста, подождите.</p>
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Загрузка...</span>
                  </div>
                </React.Fragment>
              }
            </div>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return { oauthCallback: state.auth.oauthCallback, token: state.auth.token };
}

const mapDispatchToProps = { oauthCallbackAction: oauthCallback };

export default connect(mapStateToProps, mapDispatchToProps)(OAuthCallback);
