import React from 'react';
import {Modal, Card, Image} from 'semantic-ui-react';
import NewChannelOfferForm from './NewChannelOfferForm';

type Props = {
  newChannelOfferFormOpen: boolean
  handleNewChannelOfferFormOpen: () => void
  handleNewChannelOfferFormClose: () => void
};

const NewChannelOfferModal: React.FC<Props> = (props) => {
  const newOfferCard = () => {
    return(
      <>
      <Card raised={true} onClick= {props.handleNewChannelOfferFormOpen}>
        <Image src='http://cdn.onlinewebfonts.com/svg/img_148071.png' wrapped ui={false} />
        <Card.Content>
          <Card.Header>
            New Offer
          </Card.Header>
          <Card.Description>
            Create a new offer!
          </Card.Description>
        </Card.Content>

      </Card>
      </>)
  }
  return(
    <>
      <Modal
        trigger={newOfferCard()}
        open={props.newChannelOfferFormOpen}
        onClose={props.handleNewChannelOfferFormClose}
      >
        <Modal.Header> Create a new offer for a channel</Modal.Header>
        <Modal.Content>
          <NewChannelOfferForm
            handleCloseForm={props.handleNewChannelOfferFormClose}
          >
          </NewChannelOfferForm>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default NewChannelOfferModal;
