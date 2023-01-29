import React from 'react'
import { Container, Button, Input, Grid, Card, Dimmer, Loader, Statistic, CardContent } from 'semantic-ui-react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router';

function Home() {

    const navigate = useNavigate()

    const CredentialResponse = (response) => {
        const token = response.credential
        const decoded_token = jwt_decode(token)
        const email = decoded_token.email
        navigate("/subreddit")
    }

    return (
    <>
    <Container>
      <Grid textAlign="center" columns={3} divided padded='vertically'>
        <Grid.Row>
          <Grid.Column stretched>
            <GoogleOAuthProvider clientId="xxx">
                <GoogleLogin
                    onSuccess={CredentialResponse}
                    onError={() => {console.log('Login Failed')}}/>
            </GoogleOAuthProvider>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    </>
  );
}

export default Home;