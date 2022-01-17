import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  background-color: white;  
  height: 28vh;
  width: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 8px;
  font-size: 40px;
  ::before, ::after {
    position: absolute;
    content: attr(data-value);
  }
  ::before {
    top: 10px;
    left: 10px;
  }
  ::after {
    bottom: 10px;
    right: 10px;
    transform: rotate(180deg);
  }
`;


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
        
      }

      render() {
        return (
          <Container data-value={this.props.value}> 
            {this.props.suit}
          </Container>
        );
      }
}

export default Card;