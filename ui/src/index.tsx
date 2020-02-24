import {navigate, RouteComponentProps, Router} from '@reach/router';
import React from 'react';
import {AuthProvider, useAuth} from 'react-auth-hook';
import ReactDOM from 'react-dom';
import {SemanticToastContainer} from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './app/App'


function AuthCallback({ location }: RouteComponentProps) {
  const { handleAuth } = useAuth();

  React.useEffect(() => {
    const origin = localStorage.getItem('ORIGIN') || undefined;

    handleAuth(origin);
  }, [handleAuth]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>You have reached the callback page - you will now be redirected</h1>
    </div>
  );
}

// production
// ReactDOM.render(
    // <AuthProvider
      // navigate={navigate}
      // auth0Domain="dev-8xkawbyi.auth0.com"
      // auth0ClientId="UrF1aclosJz45m6S3t8ztod3BHSMdah1"
    // >
      // <Router>
        // <App default/>
        // <AuthCallback path="/auth_callback"/>
      // </Router>
      // <SemanticToastContainer animation='fly up' />
    // </AuthProvider>,
    // document.getElementById('root')
// );

// development
ReactDOM.render(
      <>
        <App default/>
        <SemanticToastContainer animation='fly up' />
      </>,
    document.getElementById('root')
);


// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./app/App', render)
// }
