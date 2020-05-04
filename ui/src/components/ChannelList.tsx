import React from 'react';
import {toast} from 'react-semantic-toasts';
import {List, Divider, Button, Modal, Segment} from 'semantic-ui-react';
import {useParty, useLedger, useStreamQuery} from '@daml/react';
import * as market from '@daml.js/market';
import ChannelListItem from './ChannelListItem';
import NewChannelForm from './NewChannelForm';
import {Tuple2} from '@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7/lib/DA/Types/index'

type Props = {
  newChannelFormOpen: boolean;
  handleNewChannelFormClose: () => void;
  handleNewChannelFormOpen: () => void;
};

const ChannelList: React.FC<Props> = (props) => {
  const party = useParty();
  const channels = useStreamQuery(market.Market.Channel, () => ({}), [party]);
  const ledger = useLedger()
  const handleSubscribeToChannel = async (channelKey: Tuple2<string, string>) => {
    await ledger.exerciseByKey(market.Market.User.SubscribeToChannel, party, {channelKey});
    toast({
      title: 'Success',
      type: 'success',
      time: 3000,
      description: 'Subscribed to ' + channelKey._2 + '!',
    });
  };
  const handleUnsubscribeFromChannel = async (channelKey: Tuple2<string, string>) => {
    await ledger.exerciseByKey(market.Market.User.UnsubscribeFromChannel, party, {channelKey});
    toast({
      title: 'Success',
      type: 'success',
      time: 3000,
      description: 'Unsubscribed from ' + channelKey._2 + '!',
    });
  };

  return (
      <Segment>
        <List>
          <List.Item>
            <List.Icon name='plus'/>
            <List.Content>
              <List.Header>
                Create a new channel!
                <Modal
                  open={props.newChannelFormOpen}
                  onClose={props.handleNewChannelFormClose}
                  trigger={
                    <Button basic
                      content='Create'
                      floated='right'
                      onClick={props.handleNewChannelFormOpen}
                    />}
                >
                <Modal.Content>
                  <NewChannelForm
                    handleCloseForm={props.handleNewChannelFormClose}
                  />
                </Modal.Content>
                </Modal>
              </List.Header>
            </List.Content>
            <Divider section/>
          </List.Item>
          {channels.contracts.map(channel =>
            <ChannelListItem
              channel={channel.payload}
              handleSubscribeToChannel={() => handleSubscribeToChannel(channel.payload.chKey)}
              handleUnsubscribeFromChannel={() => handleUnsubscribeFromChannel(channel.payload.chKey)}
            >
            </ChannelListItem>)}
        </List>
      </Segment>
  )
};


export default ChannelList;
