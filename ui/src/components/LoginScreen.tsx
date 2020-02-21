import React from 'react'
import { Button, Grid, Header } from 'semantic-ui-react'

type Props = {
  onLogin: () => void;
}

/**
 * React component for the login screen of the `App`.
 */
const LoginScreen: React.FC<Props> = (props) => {
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' textAlign='center' size='huge' style={{color: '#223668'}}>
          <Header.Content>
            - dbay -
          </Header.Content>
        </Header>
          <Button basic onClick={props.onLogin} color='green'>
            Log in
          </Button>
      </Grid.Column>
    </Grid>
  );
};

export default LoginScreen;
