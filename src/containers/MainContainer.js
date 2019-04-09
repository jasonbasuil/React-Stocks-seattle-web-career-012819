import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const API = 'http://localhost:3000/stocks'

class MainContainer extends Component {

  constructor() {
    super();
    this.state = {
      stocks: [],
      bought: [],
      displayStocks: [],
      alphabetize: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.removeStock = this.removeStock.bind(this)
    this.alphabetize = this.alphabetize.bind(this)
    this.priceSort = this.priceSort.bind(this)

    this.typeSort = this.typeSort.bind(this)
  }

  componentDidMount() {
    fetch(API)
    .then(res => res.json())
    .then(data => {
      this.setState({stocks: data})
    })
  }

  handleClick = (stock) => {
    console.log('bought stock')
    let bought = this.state.bought
    if (bought.includes(stock)) {
      alert('Sorry, you already bought this stock')
    } else {
      bought.push(stock)
    }
    this.setState({bought: bought})
  }

  removeStock = (stock) => {
    console.log('removing stock')
    let bought = this.state.bought
    console.log(bought)
    bought.splice(bought.indexOf(stock), 1)
    this.setState({bought: bought})
  }

  alphabetize = () => {
    console.log('alphabetize')
    let stocks = this.state.stocks
    let sortedStocks = stocks.sort((a, b) => (a.ticker > b.ticker) ? 1 : -1)
    this.setState({stocks: sortedStocks})
  }

  // alphabetizeCheck = () => {
  //   if (this.state.alphabetizeCheck === false) {
  //     this.setState({alphabetizeCheck: true});
  //     return this.state.alphabetizeCheck
  //   } else {
  //     this.setState({alphabetizeCheck: true})
  //   }
  // }

  // toggleTrueFalse = () => {
  //   if (this.state.alphabetize === false) {
  //     this.setState({alphabetize: true})
  //   } else {
  //     this.setState({alphabetize: false})
  //   }
  // }

  priceSort = () => {
    console.log('price sorting')
    let stocks = this.state.stocks
    let sortedStocks = stocks.sort((a, b) => (a.price > b.price) ? 1 : -1)
    this.setState({stocks: sortedStocks})
  }

  typeSort = (ev) => {
    console.log('sorting by type')

    let stocks = this.state.stocks.slice()
    this.setState({displayStocks: stocks})

    let filteredStocks = stocks.filter((stock => {
      return stock.type === ev.target.value
    }))

    this.setState({displayStocks: filteredStocks})
    console.log(this.state.displayStocks)
  }

  render() {
    return (
      <div>
        <SearchBar
          alphabetize={this.alphabetize}
          priceSort={this.priceSort}
          typeSort={this.typeSort}
          // toggleTrueFalse={this.toggleTrueFalse}
          // isTrueOrFalse={this.state.alphabetize}
        />

          <div className="row">
            <div className="col-8">


              <StockContainer
                stocks={this.state.stocks}
                displayStocks={this.state.displayStocks}
                handleClick={this.handleClick}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
                bought={this.state.bought}
                removeStock={this.removeStock}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
