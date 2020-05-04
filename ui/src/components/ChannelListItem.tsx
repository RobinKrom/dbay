import React from 'react';
import {Channel} from '@daml.js/market/lib/Market';
import {List, Divider, Button} from 'semantic-ui-react';
import {useParty} from '@daml/react';

type Props = {
  channel: Channel;
  handleSubscribeToChannel: () => void;
  handleUnsubscribeFromChannel: () => void;
}

const ChannelListItem: React.FC<Props> = ({channel, handleSubscribeToChannel, handleUnsubscribeFromChannel}) => {
  const party = useParty();
  const SubscribeButton: React.FC = () => {
    if (channel.chSubscribers.includes(party))
      return (<Button c
                color='green' floated='right'
                onClick={handleUnsubscribeFromChannel}
              > Subscribed
              </Button>)
    else
      return (<Button basic content='Subscribe' floated='right' onClick={handleSubscribeToChannel}/>)

  };

  return(
      <List.Item>
        <List.Icon name='folder'/>
        <List.Content>
          <List.Header> {channel.chKey._2} </List.Header>
          <List.Description> {channel.chDescription}
            <SubscribeButton/>
          </List.Description>
          <List.Description> operated by {channel.chOperator}</List.Description>
        </List.Content>
        <Divider section/>
      </List.Item>
  );
};

export default ChannelListItem;
