import React from 'react';
import {List, Icon, Button} from 'semantic-ui-react';
import {RecurringInvoice} from '@daml2ts/market/lib/market-0.1.0/Market';

type Props = {
  recInvoice: RecurringInvoice;
  onCancel: () => void;
}

const RecurringInvoiceListItem: React.FC<Props> = ({recInvoice, onCancel}) => {
  return (
    <List.Item>
      <List.Content floated='right'>
        <Button onClick={onCancel}>
          Cancel issuing recurring invoice
        </Button>
      </List.Content>
      <List.Content>
            <Icon name='envelope open outline' />
            Obligor:  {recInvoice.invoice.obligor}
      </List.Content>
      <List.Content>
        {recInvoice.invoice.amount}{recInvoice.invoice.currency} {recInvoice.period}
      </List.Content>
      <List.Content>
        Since: {recInvoice.start}
      </List.Content>
      <List.Content>
        <List.Description>
          {recInvoice.invoice.description}
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default RecurringInvoiceListItem;
