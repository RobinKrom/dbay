import React from 'react'
import {Card} from 'semantic-ui-react'
import {OfferCard} from './OfferCard'
import {useParty, useStreamQuery, useExerciseByKey} from '@daml/react'
import * as market from '@daml2ts/market/lib/market-0.1.0/Market'
import {toast} from 'react-semantic-toasts'
import NewChannelOfferModal from './NewChannelOfferModal'
import {CreateEvent} from '@daml/ledger'


type Props = {
  newChannelOfferFormOpen: boolean;
  handleNewChannelOfferFormOpen: () => void;
  handleNewChannelOfferFormClose: () => void;
  handleGoToUserSummary: (name: string) => void;
}

const OfferCards: React.FC<Props> = (props) =>
{
  const party = useParty();
  const sellOffers = useStreamQuery(market.Offer, () => ({}), [party]);
  const [exerciseTakeOffer] = useExerciseByKey(market.User.TakeOffer);
  const handleTakeOfferRequest = async (sellOffer: CreateEvent<market.Offer>) => {
    await exerciseTakeOffer(party, {offer: sellOffer.contractId});
    toast({
      title: 'Success',
      type: 'success',
      time: 3000,
      description: 'You bought ' + sellOffer.payload.title + '!',
    });
  }

  return (
    <Card.Group>
        <NewChannelOfferModal {... props}/>
        {sellOffers.contracts.map(sellOffer =>
          <OfferCard
            offer={sellOffer.payload}
            handleTakeOffer={() => handleTakeOfferRequest(sellOffer)}
            gotoUserSummary={props.handleGoToUserSummary}
          >
          </OfferCard>
        )}
    </Card.Group>
  )
}

export default OfferCards;
