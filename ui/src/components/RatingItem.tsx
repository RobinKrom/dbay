import React from 'react';
import {List, Rating} from 'semantic-ui-react';
import * as market from '@daml2ts/market/lib/market-0.1.0/Market';

type Props = {
  rating : market.Rating;
}


export const translateStars = (stars: market.Stars) => {
  switch (stars) {
    case market.Stars.OneStar: return 1;
    case market.Stars.TwoStars: return 2;
    case market.Stars.ThreeStars: return 3;
    case market.Stars.FourStars: return 4;
    case market.Stars.FiveStars: return 5;
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
