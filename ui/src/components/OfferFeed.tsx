import { CreateEvent } from '@daml/ledger'
import { useParty, useStreamQuery, useLedger } from '@daml/react'
import React from 'react'
import { toast } from 'react-semantic-toasts'
import { Feed, Grid } from 'semantic-ui-react'
import * as market from '@daml.js/market'
import { OfferEvent } from './OfferEvent'

const OfferFeed: React.FC = () =>
{
  const party = useParty();
  const sellOffers = useStreamQuery(market.Market.Offer, () => ({}), [party]);
  const ledger = useLedger();
  const handleTakeOfferRequest = async (offer: CreateEvent<market.Market.Offer>) => {
    await ledger.exerciseByKey(market.Market.User.TakeOffer, party, {offer: offer.contractId});
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
