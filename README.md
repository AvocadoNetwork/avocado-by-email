# avocado-by-email

# Concept

    . The sender accesses a web interface (using MetaMask) and sends AVO to a smart contract along 
       with a hash of the r  recipient's email address. A small amount of ETH should also be required for the transaction 
       fee to the recipient.

    . An email is sent to the recipient with a link

    . The recipient clicks the link to access a web interface (using Metamask). If the recipient does not have a MetaMask           wallet they should be guided to create one.

    . The recipient clicks "accept" and a transfer of the AVO is initiated by the backend server to the recipient's wallet           address.
    
 
 Currently the web app only works in rinkeby testnet.So make sure that you have some test ether in your metamask account.The     smart contract that acts as the intermediate is deployed on rinkeby(verified and published)
 Smart contract can be viewed at https://rinkeby.etherscan.io/address/0x55e9d99646a3fd56375fca795fd2db5510a990e1
 
 Avocado token contract at https://rinkeby.etherscan.io/address/0x0c8184c21a51cdb7df9e5dc415a6a54b3a39c991
 
 # How the app works and how to get it running
    
   AvoByEmail allows a user to receive tokens without paying for the transaction.On the home screen the
   sender is required to fill the recipient email and tokens to be sent(The sender must own more number
   AVO tokens otherwise the contract would through exception).So here the sender needs to make two transactions
     
     1. to the transfer() function of AVOCADO token contract to transfer tokens to smart contract address
     
     2. sendTo() (which is payable) function of the avoByEmail smart contract to store the email hash 
        and pay the transaction fees to the contract which in turn would be transferred to the recpient
        
   Then an email is sent to the recipient.If the user clicks accept token he is directed to a screen where needs
   to call the receive() function of the smart contract by entering his email and sender's address (mentioned in the 
   email sent).Then token would be transferred to receiver's address along with the fee that he had to pay.
   
   # Running the app
   
     > Clone this repository
     
     > Open terminal switch to the cloned repository location
     
     > npm install --save
     
     > cd client && npm install --save
     
     > cd ..
     
     > npm run dev
       The backend server will run at http://localhost:5000 and react app at localhost://3000
     
     > See the app running at http://localhost:3000
     
        Please Note that the transaction fees amount has been hardcoded in the app.For sending email make sure to enter your gmail id and password in the  path/avocado-by-email/index.js file 
     
     For recipient - Make sure metamask is installed and you are able to access http://localhost:3000 (as the app runs locally)
     
   
 
 
