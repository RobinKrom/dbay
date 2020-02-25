import {useParty, useReload} from '@daml/react';
import React, {useState, useEffect} from 'react';
import {Container, Image, Menu} from 'semantic-ui-react';
import {View} from '../app/App';
import ChannelList from './ChannelList';
import CreditDebitList from './CreditDebitList';
import NewOfferModal from './NewOfferModal';
import OfferCards from './OfferCards';
import QRCodeModal from './QRCodeModal';
import RatingsList from './RatingsList';
import UserSummary from './UserSummary';
import Ledger from '@daml/ledger';
import { User } from '@daml2ts/market/lib/market-0.1.0/Market';

type Props = {
  handleLogOut: () => void;
  handleGoToInvoices: () => void;
  handleGoToCards: () => void;
  handleGoToChannels: () => void;
  handleGoToRatings: () => void;
  handleGoToUserSummary: (name: string) => void;
  activeView: View;
  token: string;
  email: string;
}

/**
 * React component for the main screen of the `App`.
 */
const MainScreen: React.FC<Props> = (props) => {
  const party = useParty();
  const reload = useReload();
  const [newOfferFormOpen, openNewOfferForm] = useState(false);
  const [newChannelOfferFormOpen, openNewChannelOfferForm] = useState(false);
  const [newChannelFormOpen, openNewChannelForm] = useState(false);
  const [qrCodeOpen, openQRCode] = useState(false);
  const handleNewOfferFormOpen = () => openNewOfferForm(true);
  const handleNewOfferFormClose = () => openNewOfferForm(false);
  const handleNewChannelOfferFormOpen = () => openNewChannelOfferForm(true);
  const handleNewChannelOfferFormClose = () => openNewChannelOfferForm(false);
  const handleNewChannelFormOpen = () => openNewChannelForm(true);
  const handleNewChannelFormClose = () => openNewChannelForm(false);

  const handleQROpen = () => openQRCode(true);
  const handleQRClose = () => openQRCode(false);

  const ledger = new Ledger({token: props.token});
  const registerUser = async () => {
    const user = await ledger.lookupByKey(User, party);
    if (user === null) {
      ledger.create(User, {party: party, email: props.email, broadcast: 'broadcast'});
    }
  }

  useEffect(() => {
    registerUser();
  }
  , [party]);

  const branchView = (props: Props) => {
    switch (props.activeView.kind) {
      case 'ratings' :
        return (
          <>
            <RatingsList>
            </RatingsList>
          </>
        )
      case 'invoices' :
        return(
          <>
           <CreditDebitList>
           </CreditDebitList>
          </>
        )
      case 'cards' :
        return (
          <>
            <OfferCards
              newChannelOfferFormOpen={newChannelOfferFormOpen}
              handleNewChannelOfferFormOpen={handleNewChannelOfferFormOpen}
              handleNewChannelOfferFormClose={handleNewChannelOfferFormClose}
              handleGoToUserSummary={props.handleGoToUserSummary}
            >
            </OfferCards>
          </>
        )
      case 'channels' :
        return(
          <>
            <ChannelList
              newChannelFormOpen={newChannelFormOpen}
              handleNewChannelFormClose={handleNewChannelFormClose}
              handleNewChannelFormOpen={handleNewChannelFormOpen}
            >
            </ChannelList>
          </>
        )
      case 'usersummary': return (<UserSummary name={props.activeView.name} />)
    }
  }
  return (
    <>
      <Menu icon borderless>
        <Menu.Item>
          <Image
            as='a'
            href='https://www.daml.com/'
            target='_blank'
            src='/daml.svg'
            alt='DAML Logo'
            size='mini'
          />
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item position='right'>
            You are logged in as &nbsp; <strong>{party}</strong>.
          </Menu.Item>
          <Menu.Item
            position='right'
            onClick={props.handleGoToCards}
            icon='th'
          >
          </Menu.Item>
          <Menu.Item
            position='right'
            active={false}
            icon='rss'
            onClick={props.handleGoToChannels}
          >
          </Menu.Item>
          <Menu.Item
            position='right'
            active={false}
          >
            <NewOfferModal
              newOfferFormOpen={newOfferFormOpen}
              handleNewOfferFormOpen={handleNewOfferFormOpen}
              handleNewOfferFormClose={handleNewOfferFormClose}
           />
          </Menu.Item>
          <Menu.Item
            position='right'
            active={false}
            icon='ordered list'
            onClick={props.handleGoToInvoices}
          >

          </Menu.Item>
          <Menu.Item
            position='right'
            active={false}
            icon='star'
            onClick={props.handleGoToRatings}
          >
          </Menu.Item>
          <Menu.Item
            position='right'
            active={false}
          >
            <QRCodeModal
              party={party}
              handleQROpen={handleQROpen}
              handleQRClose={handleQRClose}
              qrCodeOpen={qrCodeOpen}
            />
          </Menu.Item>
          <Menu.Item
            position='right'
            active={false}
            onClick={() => reload()}
            icon='refresh'
          />
          <Menu.Item
            position='right'
            active={false}
            onClick={props.handleLogOut}
            icon='log out'
          />
        </Menu.Menu>
      </Menu>

      <Container position='middle' width='450'>
        {branchView(props)}
      </Container>
    </>
  );
};

export default MainScreen;
