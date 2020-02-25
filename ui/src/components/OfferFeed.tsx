import { CreateEvent } from '@daml/ledger'
import { useExerciseByKey, useParty, useStreamQuery } from '@daml/react'
import React from 'react'
import { toast } from 'react-semantic-toasts'
import { Feed, Grid } from 'semantic-ui-react'
import * as market from '@daml2ts/market/lib/market-0.1.0/Market'
import { OfferEvent } from './OfferEvent'

const OfferFeed: React.FC = () =>
{
  const party = useParty();
  const sellOffers = useStreamQuery(market.Offer, () => ({}), [party]);
  const [exerciseTakeOffer] = useExerciseByKey(market.User.TakeOffer);
  const handleTakeOfferRequest = async (offer: CreateEvent<market.Offer>) => {
    await exerciseTakeOffer(party, {offer: offer.contractId});
    toast({
      title: 'Success',
      type: 'success',
      time: 3000,
      description: 'You bought ' + offer.payload.title + '!',
    });
  }
  return (
    <Grid textAlign='center' verticalAlign='middle'>
    <Grid.Column>
      <Feed divided>
        {sellOffers.contracts.map(sellOffer =>
          <OfferEvent
            offer={sellOffer.payload}
            handleTakeOffer={() => handleTakeOfferRequest(sellOffer)}
          >
          </OfferEvent>
        )}
      </Feed>
    </Grid.Column>
    </Grid>

  )
}

export default OfferFeed;
