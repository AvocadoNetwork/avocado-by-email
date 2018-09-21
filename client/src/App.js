import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header  from "./components/Header";
import Card from "./components/Card";
import getWeb3 from "./components/getWeb3";
import avoByEmail from "./components/avoByEmail";
import { BrowserRouter as Router,Switch,Route, Link } from "react-router-dom";
import avotoken from "./components/avotoken";
import Receive from "./components/receive";
import Dialog from "./components/Dialog";
import Spinner from "./components/spinner";
class App extends Component {
  constructor() {
    super();
    this.state={
      web3:null,
      accounts:null,
      avoByEmail:null,
      avotoken:null,
      showDialog:false,
      spin:false,
      err:null,
      show:false
    }
  }
  componentDidMount = async () => {
        try {
          //Get network provider and web3 instance.
          const web3 = getWeb3;
          var network=await web3.eth.net.getNetworkType();
          if(network!=="rinkeby") {
            throw "error";
          }
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
          if(accounts.length==0){
            throw "No account found";
          }
        console.log(accounts);
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({web3,accounts,avoByEmail,avotoken});
          /**
           * if the user changes the metamask account the site will reload to maintain consistency
           */
          setInterval(function() {
             web3.eth.getAccounts().then(res=>{
              if (accounts[0] !== res[0]) {
                window.location.reload();
              }
             });
           
          }, 100);
          
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
        }
      };
      /**
       * @dev to send email via backend server
       * @param {string} email
       * @param {string} address
       */
    sendMail=async(email,address)=>{

      var resp= await fetch("http://localhost:5000/mail?email="+email+"&address="+address,{
        method:"POST",
      })
      console.log(resp);
      
    }
    /**
     * @dev to  submit request to the contract
     * @param {object} details 
     */
    callcontract = async(details) =>{
    //for now the contract adderess of avoByemail has been hard coded
    try{
      this.setState({spin:true});
      var hashReturned="";
      document.getElementsByClassName("main")[0].style.opacity=0.5;
      /**
       * to transfer token to the avoByEmail contract
       */
     await avotoken.methods.transfer('0x55E9D99646A3fd56375fCA795FD2db5510A990e1',details.token).send({
      from:this.state.accounts[0]
    },(err,hash)=>{
  
      if(err) { this.setState({spin:false});document.getElementsByClassName("main")[0].style.opacity=1;throw "Oops! transaction did not complete";}
    })
     /**
       * to transfer gas fees to the contract which would be returned to the receipient
       */
      await  avoByEmail.methods.sendTo(details.email,details.token).send({
        from:this.state.accounts[0],
        value:this.state.web3.utils.toWei("0.000066885","ether")
       },(err,Thash)=>{
        if(err) {this.setState({spin:false});document.getElementsByClassName("main")[0].style.opacity=1;throw "Oops! transaction did not complete";}
       hashReturned=Thash;
       })
       var addressToSend="";
       await this.state.web3.eth.getTransactionReceipt(hashReturned,(err,receipt)=>{
           this.sendMail(details.email,receipt.from);
       });
    
       this.setState({spin:false});
       document.getElementsByClassName("main")[0].style.opacity=1;
    }catch(err){
      this.setState({err,show:true,spin:false});
    }
  }
    /**
     * @dev to receive tokens by the receipient
     * @param {object} details
     */
    receiveToken= async(details) =>{
      this.setState({spin:true});
      document.getElementsByClassName("main")[0].style.opacity=0.5;
       try {
        await avoByEmail.methods.receive(details.email,details.address).send({
          from:this.state.accounts[0],
        }
       ,(err,Thash)=>{
        if(err) {this.setState({spin:false});document.getElementsByClassName("main")[0].style.opacity=1;throw "Oops! transaction did not complete";}
 
       })
       this.setState({spin:false});
       document.getElementsByClassName("main")[0].style.opacity=1;
       } catch (err) {
        this.setState({err,show:true});
       }
      
    }
  render() {
    if (!this.state.web3) {
      return <div>No web3,Account deteced.Please install metamask,If already installed make sure to switch to rinkeby network<br/><a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Click to Install</a></div>;
    }
    else {return (
      <div className="App">
          {this.state.spin?<Spinner/>:""}
        <div className="main">
      <Header/>
      {this.state.show?<Dialog description={this.state.err}/>:""}
     <Switch>
         <Route exact={true} path='/' render={(routeProps)=>(<Card {...routeProps} caller={this.callcontract.bind(this)}/>)}/>
         <Route  path='/view' render={(routeProps)=>(<Receive {...routeProps} caller={this.receiveToken.bind(this)}/>)}/>
         </Switch>
        </div>
       </div>
     );
   }
 }
}
 
export default App;
