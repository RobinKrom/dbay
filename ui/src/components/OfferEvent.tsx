import React from 'react';
import {Feed, Icon, Grid} from 'semantic-ui-react';
import { Offer } from '@daml2ts/market/lib/market-0.1.0/Market';

type Props = {
  offer: Offer
  handleTakeOffer: () => void;
}

export const OfferEvent: React.FC<Props> = ({offer, handleTakeOffer}) => {
    return (
      <Feed.Event>
        <Feed.Label>
          <Icon name='pencil'/>
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User> {offer.seller}</Feed.User>
            <Feed.Date> {offer.date} </Feed.Date>
            <Feed.Extra> {offer.title}</Feed.Extra>
          </Feed.Summary>
          <Feed.Extra>
            {offer.description}
          </Feed.Extra>
          <Feed.Extra images>
            <a href={offer.photoLink} > <img src={offer.photoLink} alt={offer.title}/> </a>
          </Feed.Extra>
          <Feed.Extra>
            <Feed.Content>
              <Grid columns={2}>
                <Grid.Column>
                  {offer.price}{offer.currency}
                </Grid.Column>
                <Grid.Column>
                  <Icon name='handshake outline' onClick={handleTakeOffer}/>
                </Grid.Column>
              </Grid>
            </Feed.Content>
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    );
};

export default OfferEvent;
