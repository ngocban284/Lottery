import React  from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import Web3Utils from 'web3-utils'

class App extends React.Component{
  state={
    manager:'',
    players:[],
    balance:'',
    value:'',
    message:''
  }
  
  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({manager,players,balance});
  }

  onSubmit = async (event)=>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({message:"Wating on tracsaction success..."});

    await lottery.methods.enter().send({
      from:accounts[0],
      value: Web3Utils.toWei(this.state.value,'ether')
    });

    this.setState({message:"You have been entered!"});

  }

  render(){


    return(
      <div className="App">
      <header className="App-header">
         <h2>Lottery Contract</h2>
         <p>Manager is : {this.state.manager}</p>
         <p>People enter {this.state.players.length}</p>
         <p>Competing to win  {Web3Utils.fromWei(this.state.balance,'ether')} ether </p>
         <form onSubmit={this.onSubmit}>
           <h4>Want try your luck ?</h4>
           <label>Amount of ether to enter</label>
            <input 
              value={this.state.value}
              onChange={(e)=>this.setState({value:e.target.value})}            
            />
            <button>Enter</button>
            <h3>{this.state.message}</h3>
         </form>
      </header>
    </div>
    )
  }
}

export default App;
