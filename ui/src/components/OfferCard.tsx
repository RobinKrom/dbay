import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Offer, Period } from '@daml2ts/market/lib/market-0.1.0/Market';
import User from './User';

type Props = {
  offer: Offer
  handleTakeOffer: () => void;
  gotoUserSummary: (name: string) => void;
}

const periodToString = (period: Period) => {
  switch (period) {
    case Period.Daily: return 'per Day'
    case Period.Monthly: return 'per Month'
    case Period.Yearly: return 'per Year'
    default: return ''
  }
}

export const OfferCard: React.FC<Props> = ({offer, handleTakeOffer, gotoUserSummary}) => {
    return (
      <Card>
        <Image src={offer.photoLink} wrapped ui={false} />
        <Card.Content>
          <Card.Header>
            {offer.title}
          </Card.Header>
          <Card.Meta>
            <span className='date'> {offer.date} </span>
            <span className='date'> <User name={offer.seller} gotoUserSummary={gotoUserSummary}/> </span>
          </Card.Meta>
          <Card.Description>
            {offer.description}
          </Card.Description>
        </Card.Content>
        <Card.Content>
            {offer.price} {offer.currency} {periodToString(offer.period)}
            <Button basic color='orange' floated='right' content='Take offer' onClick={handleTakeOffer}/>
        </Card.Content>
      </Card>
    );
};

export default OfferCard;
