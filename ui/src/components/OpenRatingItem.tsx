import React from 'react'
import { CreateEvent } from '@daml/ledger'
import {useExercise} from '@daml/react'
import {toast} from 'react-semantic-toasts';
import {List, Button, Form, TextArea, Rating, FormProps} from 'semantic-ui-react';
import * as market from '@daml2ts/market/lib/market-0.1.0/Market';
import {useState} from 'react';

type Props = {
  openRatingEvent: CreateEvent<market.OpenRating>;
}

const OpenRatingItem: React.FC<Props> = ({openRatingEvent}) => {
  const openRating = openRatingEvent.payload
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [currentForm, setCurrentForm] = useState<market.Rate>(
      {stars: market.Stars.FiveStars, experience: ''})
  const [exerciseRate] = useExercise(market.OpenRating.Rate)
  const onFormChange = (e:any, {name, value}:any) => {
    if (e) {
      e.preventDefault();
      setCurrentForm({...currentForm, [name]:value});
    }
  };
  const numberToStars = (n : number | undefined): market.Stars => {
    switch (n) {
      case 1 : return market.Stars.OneStar
      case 2 : return market.Stars.TwoStars
      case 3 : return market.Stars.ThreeStars
      case 4 : return market.Stars.FourStars
      case 5 : return market.Stars.FiveStars
      default: return market.Stars.FiveStars
    };
  };

  const onStarsChange = (e: any, {rating, maxRating}: any) => {
    if (e) {
      e.preventDefault();
      setCurrentForm({...currentForm, stars: numberToStars(rating)});
    };
  };

  const handleSubmitRating = async (event: any, data: FormProps) => {
    if (event)
      event.preventDefault()

    await exerciseRate(openRatingEvent.contractId, currentForm);
    toast({
      title: 'Success',
      type: 'success',
      time: 3000,
      description: 'Submitted rating.',
    });
  };

  return (
    <List.Item>
      <List.Content onClick={() => setFormOpen(!formOpen)}>
        <List.Description>
          {openRating.title}
        </List.Description>
        <List.Description>
          by <strong> {openRating.user}</strong>
        </List.Description>
      </List.Content>
      <List.Content>
        {formOpen ? ( <Form onSubmit={handleSubmitRating}>
                        <Form.Field>
                          <Rating
                            icon='star'
                            defaultRating={5}
                            maxRating={5}
                            onRate={onStarsChange}
                          />
                        </Form.Field>
                        <Form.Field
                          name='experience'
                          control={TextArea}
                          placeholder='Describe your experience of this trade'
                          value={currentForm.experience}
                          onChange={onFormChange}
                        >
                        </Form.Field>
                        <Form.Field
                          fluid
                          control={Button}
                        >
                        Submit
                        </Form.Field>
                    </Form>
                    )
             : (<> </>)
        }
      </List.Content>
    </List.Item>
  );
};

export default OpenRatingItem;
