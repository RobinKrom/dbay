import React from 'react';
import {List, Grid, Segment} from 'semantic-ui-react';
import RatingItem from './RatingItem';
import OpenRatingItem from './OpenRatingItem';
import * as market from '@daml.js/market';
import {useParty, useStreamQuery} from '@daml/react';

const RatingsList: React.FC = () => {
  const party = useParty();
  const ratings = useStreamQuery(market.Market.Rating, () => ({user: party}), [party]);
  const openRatings = useStreamQuery(market.Market.OpenRating, () => ({buyer: party}), [party]);
  return (
    <Segment>
      <Grid columns={2}>
        <Grid.Column>
          <List divided relaxed>
            <List.Header>
              <h2> Received ratings </h2>
            </List.Header>
            {ratings.contracts.map(rating=>
              <RatingItem
                rating={rating.payload}
              >
              </RatingItem>
            )}
          </List>
        </Grid.Column>
        <Grid.Column>
          <List divided relaxed>
            <List.Header>
              <h2> Open ratings </h2>
            </List.Header>
            {openRatings.contracts.map(openRating =>
              <OpenRatingItem
                openRatingEvent={openRating}
              >
              </OpenRatingItem>
            )}
          </List>
        </Grid.Column>
      </Grid>
    </Segment>
  )
};

export default RatingsList;
