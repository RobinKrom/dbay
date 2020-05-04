import React from 'react';
import {List, Grid, Button} from 'semantic-ui-react';
import {Invoice} from '@daml.js/market/lib/Market';

type Props = {
  invoice: Invoice;
  onPay: () => void;
}

const InvoiceListItem: React.FC<Props> = ({invoice, onPay}) => {
  return (
    <List.Item>
      <List.Content floated='right'>
        <Button onClick={onPay}>
          Pay
        </Button>
      </List.Content>
      <List.Icon name='cart arrow down' />
      <List.Content>
        <List.Header>
          <Grid columns={3}>
            <Grid.Column>
              Biller:  {invoice.owner}
            </Grid.Column>
            <Grid.Column textAlign='right'>
            {invoice.amount}{invoice.currency}
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid>
        </List.Header>
        <List.Description>
          {invoice.description}
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default InvoiceListItem;
