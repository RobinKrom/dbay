import React from 'react';
import {toast} from 'react-semantic-toasts';
import {Button, Dropdown, Form, Input, TextArea, Radio} from 'semantic-ui-react';
import {useParty, useLedger} from '@daml/react';
import * as market from '@daml.js/market';

type Props = {
    handleCloseForm: () => void;
};

const NewChannelOfferForm: React.FC<Props> = ({handleCloseForm}) => {
  const party = useParty();
  const [recurring, setRecurring] = React.useState(false)
  const [currentForm, setState] = React.useState<market.Market.NewChannelOffer>(
      { channel:{_1: 'NO OPERATOR'
                , _2: 'NO KEY'
                }
      , title:''
      , description:''
      , photoLink:'no photo'
      , price:''
      , currency: market.Market.Currency.USD
      , period: market.Market.Period.Once
      }
  );

  const ledger = useLedger();

  const onChange = (e: any, {name, value}: any) => {
    if (e)
      e.preventDefault()
    if (name === 'operator')
      setState({...currentForm, channel: {...currentForm.channel, _1: value}})
    else if (name === 'channel')
      setState({...currentForm, channel: {...currentForm.channel, _2 : value}})
    else
      setState({...currentForm, [name]:value})
  };

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    if (event)
      event.preventDefault();

    await ledger.exerciseByKey(market.Market.User.NewChannelOffer, party, currentForm);
    handleCloseForm();
    toast({
      title: 'Success',
      type: 'success',
      time: 3000,
      description: 'Created new channel offer.',
    });
  };

  const CurrencyDropdown = () => (
    <Dropdown
      placeholder='Select currency'
      name='currency'
      fluid
      selection
      options={currencyOptions}
      onChange={onChange}
    />
    );
  const currencyOptions = [
    {key: 'CHF',
     text: 'CHF',
     value: 'CHF'
    },
    {key: 'USD',
     text: 'USD',
     value: 'USD'
    }
  ];

  const RecurringDropdown = () => (
    recurring
    ?
      <Dropdown
        name='period'
        placeholder='Select period'
        value={currentForm.period}
        fluid
        selection
        options={recurringOptions}
        onChange={onChange}
      >
      </Dropdown>
    : <> </>
  );
  const recurringOptions = [
    {key: 'Daily',
     text: 'Daily',
     value: market.Market.Period.Daily
    },
    {key: 'Monthly',
     text: 'Monthly',
     value: market.Market.Period.Monthly
    },
    {key: 'Yearly',
     text: 'Yearly',
     value: market.Market.Period.Yearly
    }
  ];

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Field
        label='Operator'
        control={Input}
        placeholder='Operator'
        name='operator'
        onChange={onChange}
      >
      </Form.Field>
      <Form.Field
        label='Channel'
        control={Input}
        placeholder='Channel'
        name='channel'
        onChange={onChange}
      >
      </Form.Field>
      <Form.Field
        label='Title'
        control={Input}
        placeholder='Title'
        name='title'
        onChange={onChange}
      >
      </Form.Field>
      <Form.Field
        label='Description'
        name='description'
        control={TextArea}
        placeholder='Describe your offer'
        onChange={onChange}
      >
      </Form.Field>
      <Form.Field
        label='Photo'
        name='photoLink'
        control={Input}
        placeholder='Photo url'
        onChange={onChange}
      >
      </Form.Field>
      <Input
        placeholder='Price'
        label={<CurrencyDropdown/>}
        labelPosition='right'
        name='price'
        onChange={onChange}
      />
      <Form.Field>
        <Radio
          toggle
          control={Radio}
          label='Recurring Payment'
          name='recurring'
          checked={recurring}
          onChange={() => setRecurring(!recurring)}
        />
      </Form.Field>
      <RecurringDropdown/>
      <Form.Group>
        <Form.Field control={Button}> Submit </Form.Field>
        <Form.Field control={Button} onClick={handleCloseForm}> Cancel </Form.Field>
      </Form.Group>
    </Form>
  );
};



export default NewChannelOfferForm;
