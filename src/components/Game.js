import React from 'react';
import styled from 'styled-components';
import * as War from '../war';
import Card from './Card';

const Container = styled.div`
  background-color: #14591D;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 99vh;
  width: 99vw;
`;

const Title = styled.h1`
  font-size: 44px;
  text-align: center;
  color: #DB3A34;
  margin-bottom: 30px;
  font-family: 'Arapey', serif;
`;

const DeckArea = styled.div`
  padding: 24px;
  width: 99vw;
  display: flex;
  justify-content: center;
`

const Deck = styled.div` 
  height: 28vh;
  width: 10vw;
  border: 1px solid black;
  border-radius: 8px;
  margin-right: 40px;
  background-color: ${props => props.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlayerTitle = styled.span`
  font-size: 20px;
  margin-bottom: 24px;
`

const Amount = styled.span`
  font-size: 32px;
`

const Message = styled.span`
  font-size: 22px;
`

const PlayButton = styled.button`
  width: 10vw;
  height: 6vh;
  margin: 10px 0px;
  font-size: 18px;
  background-color: #AFD5AA;
`;

const initialState = {
  player1deck: null,
  player2deck: null,
  player1card: {value: null, suit: null},
  player2card: {value: null, suit: null},
  status: "NOT_STARTED",
  buttonText: "Start Game",
  message: "",
};

const value_map = {
  "2" : 2,
  "3" : 3,
  "4" : 4,
  "5" : 5,
  "6" : 6,
  "7" : 7,
  "8" : 8,
  "9" : 9,
  "10" : 10,
  "J" : 11,
  "Q" : 12,
  "K" : 13,
  "A" : 14
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.clickHandler = this.clickHandler.bind(this);
        
      }

      //shuffle and get decks to state
      getDecks() {
        const deck = new War.Deck();
        this.setState({
          player1deck: deck.decks.deck1,
          player2deck: deck.decks.deck2,
        });
      }

      //get decks on mount
      componentWillMount() {
        this.getDecks();
      }

      //draw cards and assign them to state
      startGame() {
        this.setState({
          status: "STARTED",
          buttonText: "Battle"
        })

        this.playGame();
      }

      playGame() {
        this.compareValues();
        this.checkAmount();
      }


      compareValues() {
        const card1 = this.state.player1deck.shift();
        const card2 = this.state.player2deck.shift();

        this.setState({
          player1card: card1,
          player2card: card2,
        })
        
        this.compare(card1,card2);
      }
      

      compare(card1, card2) {
        if (value_map[card1.value] > value_map[card2.value]) {
          this.state.player1deck.push(card1, card2);
          this.setState({
            message: "Player 1 won",
          });

        } else if (value_map[card1.value] < value_map[card2.value]){
          this.state.player2deck.push(card1, card2);
          this.setState({
            message: "Player 2 won",
          });
        } else {
                const warCards = [card1, card2];
                let cardsEqual = true;
                while (cardsEqual) {
                    if (this.state.player1deck.length === 0 && this.state.player2deck.length === 0 || this.state.player1deck.length === 1 && this.state.player2deck.length === 1) {
                        cardsEqual = false;
                        this.endGame("Tie!");
                    } else if ((this.state.player1deck.length === 0 || this.state.player1deck.length === 1) && this.state.player2deck.length > this.state.player1deck.length){
                        cardsEqual = false;
                        this.endGame("Player 2 Wins!");
                    } else if ((this.state.player2deck.length === 0 || this.state.player2deck.length === 1) && this.state.player1deck.length > this.state.player2deck.length) {
                        cardsEqual = false;
                        this.endGame("Player 1 Wins!");
                    }

                    const player1FaceDown = this.state.player1deck.shift();
                    const player2FaceDown = this.state.player2deck.shift();
                    const player1FaceUp = this.state.player1deck.shift();
                    const player2FaceUp = this.state.player2deck.shift();
                    warCards.push(player1FaceDown, player2FaceDown, player1FaceUp, player2FaceUp);
                    let winner;
                    if (player1FaceUp.value > player2FaceUp.value) {
                        cardsEqual = false;
                        this.state.player1deck.push(...warCards);
                        winner = "Player 1";
                    } else if (player2FaceUp.value > player1FaceUp.value) {
                        cardsEqual = false;
                        this.state.player2deck.push(...warCards);
                        winner = "Player 2";
                        console.log(this.state);
                    }

                    this.setState({
                        message: `${winner} won the War! (${warCards.length} cards)`,
                        player1card: player1FaceUp,
                        player2card: player2FaceUp,
                    });
                }
            }
    }
        
      endGame(message) {
        this.setState({
          status: "FINISHED",
          buttonText: "Start New Game",
          message: `${message}`
        });
      }

      checkAmount() {
        if (this.state.player1deck.length === 0) {
          this.endGame("Player 2 Wins");
        }

        if (this.state.player2deck.length === 0) {
          this.endGame("Player 1 Wins");
        }
      }

      clickHandler() {
        switch(this.state.status) {
          case "NOT_STARTED":
            this.startGame();
            break;
          case "STARTED":
            this.playGame();
            break;
          case "FINISHED":
            this.setState(initialState);
            this.getDecks();
          
        }
      }
      // addWinToDatabase() {
      //   const addWin = async () => {
      //     try{
      //         const res = await axios.put(`http://localhost:5000/api/player/${id}}`);
      //     }catch(err) {}
      // };
      // addWin();
      // }

      render() {
        // console.log(this.state);
        return ( 
          
          <Container> 
              <Title>War</Title>
              
              <DeckArea>
                <Deck color="#145C9E">
                  <PlayerTitle>Player 1</PlayerTitle>
                  <Amount>{this.state.player1deck ? this.state.player1deck.length : null}</Amount>
                  <div>Cards Remaining</div>
                </Deck>

                <Card value={this.state.player1card.value} suit={this.state.player1card.suit} color={this.state.player1card.color}/>
              </DeckArea>

              <Message> {this.state.message} </Message>

              <PlayButton onClick={this.clickHandler}>{this.state.buttonText}</PlayButton>

              <DeckArea>
                <Deck color="#FFD25A">
                  <PlayerTitle>Player 2</PlayerTitle>
                  <Amount>{this.state.player2deck ? this.state.player2deck.length : null}</Amount>
                  <div>Cards Remaining</div>
                  
                </Deck>

                <Card value={this.state.player2card.value} suit={this.state.player2card.suit} color={this.state.player2card.color}/>
              </DeckArea>

          </Container>
        );
      }
}

export default Game;