# Humanize

an Ethereum proof-of-existence decentralized application for humanizing global supply chains

## Project Description

This project is an implementation of the Truffle `react-uport` box to create a mobile-friendly PoE dapp for humanizing global supply chains. V1 of the project allows a user to upload a selfie, picture of a product, or other form of media (video or audio) onto IPFS and sign a transaction to create a record using the blockchain. Plans for V2 include the ability to more easily store and display multiple PoE records on the blockchain and in the UI, as well as the ability to store and display more optional information (user's name, age, location, etc).

## Setup

To install run:

```
git clone https://github.com/CruzMolina/humanize.git
cd humanize
npm install
```

## Running

To run:

```
npm start
```

The server will launch the app at http://localhost:3000.

The dapp is currently configured to interact with the Rinkeby Test Network.

## Testing

To run truffle tests:

```
truffle test
```

## Live

Humanize is currently live at https://humanize1.herokuapp.com/.
