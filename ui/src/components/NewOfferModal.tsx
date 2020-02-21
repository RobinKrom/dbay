import React from 'react';
import {Button, Icon, Modal} from 'semantic-ui-react';
import NewOfferForm from './NewOfferForm';

type Props = {
  newOfferFormOpen: boolean
  handleNewOfferFormOpen: () => void
  handleNewOfferFormClose: () => void
};

const NewOfferModal: React.FC<Props> = (props) => {
  return(
    <>
      <Modal
        trigger={<Button basic icon onClick={props.handleNewOfferFormOpen}> <Icon name='user' /> </Button>}
        open={props.newOfferFormOpen}
        onClose={props.handleNewOfferFormClose}
      >
        <Modal.Header> Create a new private offer </Modal.Header>
        <Modal.Content>
          <NewOfferForm
            handleCloseForm={props.handleNewOfferFormClose}
          >
          </NewOfferForm>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default NewOfferModal;
