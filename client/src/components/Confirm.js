import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { confirm } from '../store/modules/auth/actions';

function Confirm({token, confirmation, confirmAction, match}) {
  useEffect(() => {
    confirmAction({verificationToken: match.params.verificationToken});
  }, []);
  
  if (token) return <Redirect to="/" />;

  return (
    <main className="container">
      <div className="row login-form justify-content-center align-items-center">
        <div className="col col-md-6">
          <div className="text-center border border-light p-5">
            <p className="h4 mb-4">Подтверждение почтового адреса</p>
  
            {confirmation.error
              ? <React.Fragment>
                <p className="text-danger">При выполнени операции произошла ошибка.</p>
                <p className="text-danger">{confirmation.error}</p>
                <Link to="/">Вход</Link>
              </React.Fragment>
              : <React.Fragment>
                <p>Почтовый адрес подтверждается, пожалуйста, подождите.</p>
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

function mapStateToProps(state) {
  return { confirmation: state.auth.confirmation, token: state.auth.token };
}

const mapDispatchToProps = { confirmAction: confirm };

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
