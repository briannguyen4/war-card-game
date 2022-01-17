import axios from 'axios';
import PlayerService from '../services/players.service'
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: grey;  
`;


class Wins extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            players: [],
        };
        this.getPlayers = this.getPlayers.bind(this);
      }

      componentDidMount() {
          this.getPlayers();
      }

      getPlayers() {
        PlayerService.getAll()
        .then(response => {
            this.setState({
                players: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e)
        });
      }

      render() {
        return (
          <Container> 
            testing
          </Container>
        );
      }
}

export default Wins;
    