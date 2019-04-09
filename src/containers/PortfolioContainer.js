import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>

          {this.props.bought.map(stock => {
            return <Stock key={stock.id} stock={stock} handleClick={this.props.removeStock}/>
          })
          }
      </div>
    );
  }

}

export default PortfolioContainer;

