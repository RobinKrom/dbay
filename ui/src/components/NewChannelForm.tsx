import React from 'react';
import {toast} from 'react-semantic-toasts';
import {Button, Form, FormProps, Input} from 'semantic-ui-react';
import {useParty, useLedger} from '@daml/react';
import * as market from '@daml.js/market';

type Props = {
  handleCloseForm: () => void;
};

const NewChannelForm: React.FC<Props> = ({handleCloseForm}) => {

  const party = useParty();
  const ledger = useLedger();
  const [currentForm, setState] = React.useState<market.Market.CreateChannel>(
    { key:''
    , description:''
    }
  );

  const handleChange = (e: any, {name, value}: any) => {
    if (e)
      e.preventDefault()
    setState({...currentForm, [name]:value})
  };
  const handleSubmit = async (event: React.FormEvent<HTMLElement>, data: FormProps) => {
    if (event)
      event.preventDefault();

    await ledger.exerciseByKey(market.Market.User.CreateChannel, party, currentForm);
    handleCloseForm();
    toast({
      title: 'Success',
      type: 'success',
      time: 3000,
      description: 'Created new channel ' + currentForm.key + '.',
    });

  };

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Field
        label='Channel'
        control={Input}
        placeholder='Channel name'
        name='key'
        onChange={handleChange}
      >
      </Form.Field>
      <Form.Field
        label='Description'
        control={Input}
        placeholder='Description'
        name='description'
        onChange={handleChange}
      >
      </Form.Field>
      <Form.Group>
        <Form.Field control={Button}> Submit </Form.Field>
        <Form.Field control={Button} onClick={handleCloseForm}> Cancel </Form.Field>
      </Form.Group>
    </Form>
  );
}

export default NewChannelForm;
