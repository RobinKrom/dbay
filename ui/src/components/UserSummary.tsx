import React from 'react';
import {Party} from '@daml/types';
import {useStreamQuery} from '@daml/react';
import * as market from '@daml.js/market';
import {List, Grid, Segment, Statistic} from 'semantic-ui-react';
import RatingItem, {translateStars} from './RatingItem';
import {average} from './User';

type Props = {
  name: Party;
};

const UserSummary: React.FC<Props> = ({name}) => {
  const ratings = useStreamQuery(market.Market.Rating, () => ({user: name}), [name]);
  const avg = average(ratings.contracts.map(x => translateStars(x.payload.stars)));
  return(
    <Segment>
      <Grid columns={2}>
        <Grid.Column>
          <Statistic>
            <Statistic.Value> {ratings.contracts.length} </Statistic.Value>
            <Statistic.Label> Total ratings </Statistic.Label>
            <Statistic.Value> {avg} </Statistic.Value>
            <Statistic.Label> Average rating </Statistic.Label>
          </Statistic>
        </Grid.Column>
        <Grid.Column>
          <List>
            {ratings.contracts.map(rating=>
              <RatingItem
                rating={rating.payload}
              >
              </RatingItem>
            )}
          </List>
        </Grid.Column>
      </Grid>
    </Segment>
  )
};

export default UserSummary;
