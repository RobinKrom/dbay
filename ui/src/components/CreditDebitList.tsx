import React from 'react';
import {List, Grid, Segment} from 'semantic-ui-react';
import InvoiceListItem from './InvoiceListItem';
import RecurringInvoiceListItem from './RecurringInvoiceListItem';
import CreditListItem from './CreditListItem';
import * as market from '@daml.js/market';
import {toast} from 'react-semantic-toasts'
import {useParty, useStreamQuery, useLedger} from '@daml/react';

const CreditDebitList: React.FC = () => {
  const party = useParty();
  const invoices = useStreamQuery(market.Market.Invoice, () => ({obligor: party}), [party]);
  const credits = useStreamQuery(market.Market.Invoice, () => ({owner: party}), [party]);
  const recurring = useStreamQuery(market.Market.RecurringInvoice, () => ({invoice: {owner: party}}), [party]);
  const ledger = useLedger();
  const handleConfirmPayment = async (contractId: string) => {
    await ledger.exerciseByKey(market.Market.User.ConfirmPayment, party, {invoice: contractId});
    toast({
      title: 'Success',
      type: 'success',
      time: 3000,
      description: 'Payment confirmed.',
    });
    }
  const handleCancelRecurringInvoice = async(contractId: string) => {
    await ledger.exerciseByKey(market.Market.User.CancelRecurringInvoice, party, {recInvoice: contractId});
    toast({
      title: 'Success',
      type: 'success',
      time: 3000,
      description: 'Recurring invoice cancelled.',
    });
  }
  return (
    <Segment>
    <Grid columns={2}>
      <Grid.Column>
        <List divided relaxed>
          <List.Header>
            <h2> Debits </h2>
          </List.Header>
          {invoices.contracts.map(invoice =>
            <InvoiceListItem
                invoice={invoice.payload}
                onPay={() => alert('Payment not implemented yet.')}
            >
            </InvoiceListItem>
          )}
        </List>
      </Grid.Column>
      <Grid.Column>
        <List divided relaxed verticalAlign='middle'>
          <List.Item>
            <h2> Credits </h2>
          </List.Item>
            {credits.contracts.map(credit =>
              <CreditListItem
                credit={credit.payload}
                onConfirmPayment={() => handleConfirmPayment(credit.contractId)}
              >
              </CreditListItem>)
            }
            {recurring.contracts.map(recurringInvoice =>
              <RecurringInvoiceListItem
                recInvoice={recurringInvoice.payload}
                onCancel={() => handleCancelRecurringInvoice(recurringInvoice.contractId)}
              >
              </RecurringInvoiceListItem>
            )
            }
        </List>
      </Grid.Column>
    </Grid>
    </Segment>
  )
};


export default CreditDebitList;
