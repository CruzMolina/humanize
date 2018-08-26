import React, { Component } from "react";
import { Container, Card, Button, Form, Message } from "semantic-ui-react";

import web3 from "../../web3";
import ipfs from "../../ipfs";
import Humanize from "../../humanize";

class Home extends Component {
  state = {
    ipfsHash: null,
    buffer: "",
    ethAddress: "",
    blockNumber: "",
    transactionHash: "",
    gasUsed: "",
    txReceipt: "",
    media: "",
    loading: false,
    error_message: "",
    name: "",
    location: "N/A",
    age: "N/A"
  };

  getSubmissions = async event => {
    event.preventDefault();
    await Humanize.ipfsHash.call((err, ipfsHash) => {
      this.setState({ media: ipfsHash });
      console.log(this.state.media);
    });
  };

  renderMedia() {
    if (this.state.media !== "") {
      const items = [
        {
          header: this.state.media,
          description: "View",
          fluid: true
        }
      ];
      return <Card.Group items={items} />;
    }
  }

  captureFile = event => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  convertToBuffer = async reader => {
    // file converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);

    this.setState({ buffer });
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });
    // bring in user's metamask account address
    const accounts = await web3.eth.accounts;

    console.log("Sending from Metamask account: " + accounts[0]);
    console.log(Humanize);
    // obtain contract address from humanize.js
    const ethAddress = await Humanize.address;
    this.setState({ ethAddress });

    // save document to IPFS,return its hash#, and set hash# to state
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      if (!ipfsHash) {
        this.setState({ errorMessage: err.message });
        console.log(err.message);
      } else {
        console.log(err, ipfsHash[0].hash);
        // setState by setting ipfsHash to ipfsHash[0].hash
        this.setState({ ipfsHash: ipfsHash[0].hash });
        // call Ethereum contract method "storeHash" and .send IPFS hash to etheruem contract
        // return the transaction hash from the ethereum contract

        Humanize.storeHash(
          this.state.ipfsHash,
          {
            from: accounts[0],
            gas: 200000
          },
          (err, transactionHash) => {
            if (!err) {
              console.log(transactionHash);
              this.setState({ transactionHash });
            } else {
              this.setState({ errorMessage: err.message });
            }
          }
        ); // storehash
      }
      this.setState({ loading: false });
    }); // await ipfs.add
  }; // onSubmit

  render() {
    return (
      <Container>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Humanize Blockchain Portal</h1>
              <Form
                loading={this.state.loading}
                onSubmit={this.onSubmit}
                error={!!this.state.errorMessage}
              >
                <Form.Group>
                  <Form.Input type="file" onChange={this.captureFile} />
                  <Form.Button content="Submit" icon="add circle" primary />
                </Form.Group>
                <Form.Group>
                  <Form.Input width={3} label="Name" placeholder="Name" />
                  <Form.Input width={0} label="Age" placeholder="Age" />
                  <Form.Input
                    width={3}
                    label="Location"
                    placeholder="Location"
                  />
                </Form.Group>
                <Message
                  error
                  header="Oops!"
                  content={this.state.errorMessage}
                />
              </Form>
              <p />
              <p>
                NOTE: When submitting, there is a slight delay before you can
                confirm your transaction.
              </p>
              <p>To view your prior submissions, click the button below!</p>
              <p>{this.state.ethAddress}</p>
              <p>{this.state.ipfsHash}</p>
              <Button
                content="View Prior Submissions"
                onClick={this.getSubmissions}
              />
              <p />
              {this.renderMedia()}
            </div>
          </div>
        </main>
      </Container>
    );
  }
}

export default Home;
