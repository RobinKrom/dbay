import React from 'react';
import {List, Rating} from 'semantic-ui-react';
import * as market from '@daml.js/market';

type Props = {
  rating: market.Market.Rating;
}


export const translateStars = (stars: market.Market.Stars) => {
  switch (stars) {
    case market.Market.Stars.OneStar: return 1;
    case market.Market.Stars.TwoStars: return 2;
    case market.Market.Stars.ThreeStars: return 3;
    case market.Market.Stars.FourStars: return 4;
    case market.Market.Stars.FiveStars: return 5;
  };
};

const RatingItem: React.FC<Props> = ({rating}) => {

  return (
    <List.Item>
      <List.Content>
        <List.Header>
          <Rating icon='star' rating={translateStars(rating.stars)} maxRating={5} />
          by {rating.user}
        </List.Header>
        <List.Header>
          {rating.title}
        </List.Header>
        <List.Description>
          {rating.experience}
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default RatingItem;
