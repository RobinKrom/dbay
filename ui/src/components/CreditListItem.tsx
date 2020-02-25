import React from 'react';
import {List, Icon, Button} from 'semantic-ui-react';
import {Invoice} from '@daml2ts/market/lib/market-0.1.0/Market';

type Props = {
  credit: Invoice;
  onConfirmPayment: () => void;
}

const CreditListItem: React.FC<Props> = ({credit, onConfirmPayment}) => {
  return (
    <List.Item>
      <List.Content floated='right'>
        <Button onClick={onConfirmPayment}>
          Confirm receipt
        </Button>
      </List.Content>
      <List.Content>
            <Icon name='envelope open outline' />
            Obligor:  {credit.obligor}
      </List.Content>
      <List.Content>
        {credit.amount}{credit.currency}
      </List.Content>
      <List.Content>
        <List.Description>
          {credit.description}
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default CreditListItem;
