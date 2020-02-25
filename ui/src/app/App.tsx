import DamlLedger from '@daml/react';
import { Party } from '@daml/types';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-auth-hook';
import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import { RouteComponentProps } from '@reach/router';
import Ledger from '@daml/ledger';
import User from '../components/User';

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
  const { login, logout, isAuthenticated, user, authResult } = useAuth();
  const party = user?.sub.replace('|', '_');
  const email = user?.email;
  const token = authResult?.idToken

  useEffect(() => {
    localStorage.setItem(
      'ORIGIN',
      `${window.location.href.replace(window.location.origin, '')}`
    );
  }, []);


  if (isAuthenticated()) {
    return (
      <DamlLedger
        token = {token}
        party = {party}
      >
        <MainScreen
          handleLogOut={logout}
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
    );

  } else {
    return <LoginScreen onLogin={login}/>;
  }

  // development
  // const token : string = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2RhbWwuY29tL2xlZGdlci1hcGkiOnsibGVkZ2VySWQiOiJkYmF5IiwicGFydGljaXBhbnRJZCI6bnVsbCwiYXBwbGljYXRpb25JZCI6ImRiYXkiLCJhZG1pbiI6ZmFsc2UsImFjdEFzIjpbImRyc2siXSwicmVhZEFzIjpbImRyc2siLCJicm9hZGNhc3QiXX0sImV4cCI6MzYwMDAwMDAwMDB9.Vs0-5-YAobDbIwD8OKheUG-rJJ2sfE3Ynna49d-J9V0QVHuOWYiLulTiYYKAjJnRPmePsrvMDOzRNx0BfEy0XEetCd6Sv-1jDsW0GpWeKtZcmLohHfB4XcYE79KHvsxXLgO9IXEF6wKyME4U0cs_xAhEqrZJjqdxrGMpDDubKLIlcUB0wd0Ovoc3CPkkg_G-SZEJGo20g18r27clahYycCCB6UyPAQx0yyInFQpkavhl4LC7aeUne8Gejsqwtajd4exWBIH25yNtnS7Iylg0_Ah19c_lk4qVpl2bUCCcFlERZyI1cdz21VoM9x4IETKAAZkf40OqXxkarQoNceNm8g';
  // const party = 'drsk';
  // const email = 'drsk@digitalasset.com';
  // return (
  // <DamlLedger
    // token = {token}
    // // token for sandbox cert found in 'certs/'.
    // party = {party}
  // >
    // <MainScreen
      // handleLogOut={() => alert("development setup, logout disabled.")}
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
  // )
}

export default App;
