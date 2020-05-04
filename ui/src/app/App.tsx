import DamlLedger from '@daml/react';
import { Party } from '@daml/types';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-auth-hook';
import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import { RouteComponentProps } from '@reach/router';

type UserSummary = {
  kind: 'usersummary';
  name: Party;
}

type Feed = {
  kind: 'feed';
}

type Cards = {
  kind: 'cards';
}

type Invoices = {
  kind: 'invoices';
}

type Channels = {
  kind: 'channels';
}

type Ratings = {
  kind: 'ratings';
}

export type View = Feed | Cards | Invoices | Channels | Ratings | UserSummary;

/**
 * React component for the entry point into the application.
 */
function App({ location }: RouteComponentProps) {
  const [view, setView] = useState<View>({kind: 'cards'});
  // production
  // const { login, logout, isAuthenticated, user, authResult } = useAuth();
  // const party = user?.sub.replace('|', '_');
  // const email = user?.email;
  // const token = authResult?.idToken

  // useEffect(() => {
    // localStorage.setItem(
      // 'ORIGIN',
      // `${window.location.href.replace(window.location.origin, '')}`
    // );
  // }, []);


  // if (isAuthenticated()) {
    // return (
      // <DamlLedger
        // token = {token}
        // party = {party}
      // >
        // <MainScreen
          // handleLogOut={logout}
          // handleGoToInvoices={() => setView({kind: 'invoices'})}
          // handleGoToCards={() => setView({kind: 'cards'})}
          // handleGoToChannels={() => setView({kind: 'channels'})}
          // handleGoToRatings={() => setView({kind: 'ratings'})}
          // handleGoToUserSummary={(n) => setView({kind: 'usersummary', name:n})}
          // activeView={view}
          // token={token}
          // email={email}
        // />
      // </DamlLedger>
    // );

  // } else {
    // return <LoginScreen onLogin={login}/>;
  // }

  // development
  const token: string = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2RhbWwuY29tL2xlZGdlci1hcGkiOnsibGVkZ2VySWQiOiJkYmF5IiwicGFydGljaXBhbnRJZCI6bnVsbCwiYXBwbGljYXRpb25JZCI6ImRiYXkiLCJhZG1pbiI6ZmFsc2UsImFjdEFzIjpbImRyc2siXSwicmVhZEFzIjpbImRyc2siXX0sImV4cCI6MzYwMDAwMDAwMDB9.HBQDgxw0BfldzmUh4bUdx3CR0-U58F1LRBTowz5VTZy35Sjtmtenu-_G-xGOrgUE0r7j0LE8XaxQUghe4aj1AgCtxnOxxLf7nnZHejZFDcl2uG0iOl7iivhaZmXejYZKMaSYCa-S9ATaY5zKDqew9lB32ixDh9apevEFRrqBytZojt4QXD_RbBK7kC8Bap0FAbAs9WqMHssAQXyu05WZjtd53kYW6x2e1OIIsn2Up_AqW9Zpa1BeDS8SSCZFzOl1BBaP3eE1x9D8K87mVdIVBLuGUGRPL_tZmiWIawoHh2LB6FX46wTFApTnyrmQt5HElIn5yqs4wtKdGbpazV9jjg';
  const party = 'drsk';
  const email = 'drsk@digitalasset.com';
  return (
  <DamlLedger
    token = {token}
    // token for sandbox cert found in 'certs/'.
    party = {party}
  >
    <MainScreen
      handleLogOut={() => alert("development setup, logout disabled.")}
      handleGoToInvoices={() => setView({kind: 'invoices'})}
      handleGoToCards={() => setView({kind: 'cards'})}
      handleGoToChannels={() => setView({kind: 'channels'})}
      handleGoToRatings={() => setView({kind: 'ratings'})}
      handleGoToUserSummary={(n) => setView({kind: 'usersummary', name:n})}
      activeView={view}
      token={token}
      email={email}
    />
  </DamlLedger>
  )
}

export default App;
