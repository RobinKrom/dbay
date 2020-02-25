import React from 'react';
import {toast} from 'react-semantic-toasts';
import {Button, Form, FormProps, Input} from 'semantic-ui-react';
import {useParty, useExerciseByKey} from '@daml/react';
import * as market from '@daml2ts/market/lib/market-0.1.0/Market';

type Props = {
  handleCloseForm: () => void;
};

const NewChannelForm: React.FC<Props> = ({handleCloseForm}) => {

  const party = useParty();
  const [exerciseCreateChannel] = useExerciseByKey(market.User.CreateChannel);
  const [currentForm, setState] = React.useState<market.CreateChannel>(
    { key:''
    , description:''
    }
  );

  const handleChange = (e:any, {name, value}:any) => {
    if (e)
      e.preventDefault()
    setState({...currentForm, [name]:value})
  };
  const handleSubmit = async (event: React.FormEvent<HTMLElement>, data: FormProps) => {
    if (event)
      event.preventDefault();

    await exerciseCreateChannel(party, currentForm);
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
