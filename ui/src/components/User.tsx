import React from 'react';
import * as market from '@daml.js/market';
import {useStreamQuery} from '@daml/react';
import {translateStars} from './RatingItem';
import {Icon} from 'semantic-ui-react';

type Props = {
  name: string;
  gotoUserSummary: (name: string) => void;
};

export const average = (xs: number[]): number => {
  return xs.reduce((acc, x) => acc + x, 0) / xs.length
};

const User: React.FC<Props> = ({name, gotoUserSummary}) => {
  const ratings = useStreamQuery(market.Market.Rating, () => ({user: name}), [name])
  const averageRating: number = average(ratings.contracts.map(x => translateStars(x.payload.stars)));
  return (
    <div
      onClick={() => gotoUserSummary(name)}
    >
    {name}(<Icon name='star'/> {averageRating})
    </div>
  )
};

export default User;
