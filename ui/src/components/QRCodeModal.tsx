import React from 'react';
import {QRCode} from 'react-qrcode-logo';
import {Modal, Icon, Button, Grid} from 'semantic-ui-react';
import * as daml from '@daml/types'

type Props = {
  party: daml.Party
  handleQROpen: () => void
  handleQRClose: () => void
  qrCodeOpen: boolean
}
const QRCodeModal: React.FC<Props> = (props) => {
  return(
    <>
    <Modal
      trigger={<Button basic icon onClick={props.handleQROpen}> <Icon name='qrcode' /> </Button>}
      open={props.qrCodeOpen}
      onClose={props.handleQRClose}
    >
      <Modal.Content>
        <Grid columns={3}>
          <Grid.Column width={4}/>
          <Grid.Column width={4}>
          <div style={{
                      width: 400,
                      height: 400,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #d4fafc',
                      borderRadius: '50px',
                      backgroundColor: '#d4fafc'
                      }}>
            <QRCode value={props.party} size={200}/>
          </div>
          </Grid.Column>
          <Grid.Column width={4}/>
        </Grid>
      </Modal.Content>
    </Modal>
    </>
  );
}

export default QRCodeModal;
