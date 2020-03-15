import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { fetchMe } from '../store/actions';

function Welcome({ me, fetchMeAction }) {
  useEffect(() => {
    fetchMeAction();
  }, []);

  return (
    <main className="container">
      <div className="row login-form justify-content-center align-items-center">
        <div className="col col-md-6">
          <div className="text-center border border-light p-5">
            <p className="h4 mb-4">Добро пожаловать</p>
            
            {me.fetching
              ? <React.Fragment>
                <p>Пожалуйста, подождите.</p>
                <div className="spinner-border" role="status">
                  <span className="sr-only">Загрузка...</span>
                </div>
              </React.Fragment>
              : <React.Fragment>
                <p>email: {me.data.email}</p>
                <p>name: {me.data.displayName}</p>
              </React.Fragment>
            }
          </div>
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return { me: state.me };
}

const mapDispatchToProps = { fetchMeAction: fetchMe };

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
