import React from 'react'
import { CreateEvent } from '@daml/ledger'
import {toast} from 'react-semantic-toasts';
import {List, Button, Form, TextArea, Rating, FormProps} from 'semantic-ui-react';
import * as market from '@daml.js/market';
import {useState} from 'react';
import { useLedger } from '@daml/react';

type Props = {
  openRatingEvent: CreateEvent<market.Market.OpenRating>;
}

const OpenRatingItem: React.FC<Props> = ({openRatingEvent}) => {
  const openRating = openRatingEvent.payload
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [currentForm, setCurrentForm] = useState<market.Market.Rate>(
      {stars: market.Market.Stars.FiveStars, experience: ''})
  const ledger = useLedger();
  const onFormChange = (e: any, {name, value}: any) => {
    if (e) {
      e.preventDefault();
      setCurrentForm({...currentForm, [name]:value});
    }
  };
  const numberToStars = (n: number | undefined): market.Market.Stars => {
    switch (n) {
      case 1 : return market.Market.Stars.OneStar
      case 2 : return market.Market.Stars.TwoStars
      case 3 : return market.Market.Stars.ThreeStars
      case 4 : return market.Market.Stars.FourStars
      case 5 : return market.Market.Stars.FiveStars
      default: return market.Market.Stars.FiveStars
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

    await ledger.exerciseByKey(market.Market.OpenRating.Rate, openRatingEvent.contractId, currentForm);
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
