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
    userAddress: "",
    media: "",
    loading: false,
    error_message: "",
    name: "N/A",
    location: "N/A",
    age: "N/A"
  };

  getSubmission = async event => {
    event.preventDefault();
    if (this.state.media !== "") {
      this.setState({ media: "" });
    } else {
      await Humanize.ipfsHash(web3.eth.accounts[0], (err, ipfsHash) => {
        this.setState({ media: ipfsHash });
      });
    }
  };

  renderMedia = () => {
    if (this.state.media !== "") {
      const items = [
        {
          image: `https://gateway.ipfs.io/ipfs/${this.state.media}`,
          header: (
            <a href={`https://gateway.ipfs.io/ipfs/${this.state.media}`}>
              View on IPFS<p />
              <p />
            </a>
          ),
          description: `Name: ${this.state.name} Age: ${
            this.state.age
          } Location: ${this.state.location}`,
          fluid: true
        }
      ];
      return <Card.Group items={items} itemsPerRow={2} />;
    }
  };

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

  renderSubmission = async () => {
    let ipfsHash;
    await Humanize.ipfsHash(web3.eth.accounts[0], (err, _ipfsHash) => {
      ipfsHash = _ipfsHash;
      if (ipfsHash !== this.state.ipfsHash) {
        this.renderSubmission();
      } else {
        this.setState({ loading: false, media: ipfsHash });
      }
    });
  };

  renderUserAddress = async () => {
    const userAddress = await web3.eth.accounts[0];
    this.setState({ userAddress: `Your current address is ${userAddress}` });
  };

  renderContractAddress = async () => {
    const ethAddress = await Humanize.address;

    this.setState({
      ethAddress: `You are interacting with the Humanize smart contract at address ${ethAddress} on the Rinkeby Test Network.`
    });
  };

  ipfsAdd = async () => {
    await this.renderUserAddress();
    await this.renderContractAddress();
    await ipfs.add(this.state.buffer, async (err, ipfsHash) => {
      if (!ipfsHash) {
        this.setState({ errorMessage: err.message, loading: false });
      } else {
        this.setState({ ipfsHash: ipfsHash[0].hash });
        // call Ethereum contract method "storeHash" and .send IPFS hash to etheruem contract
        await this.storeHash();
      }
    });
  };

  storeHash = async () => {
    await Humanize.storeHash(
      this.state.ipfsHash,
      {
        from: web3.eth.accounts[0],
        gas: 200000
      },
      async (err, transactionHash) => {
        if (!err) {
          await this.renderSubmission();
        } else {
          this.setState({ errorMessage: err.message, loading: false });
        }
      }
    );
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "", media: "" });

    // save document to IPFS, return its hash#, and set hash# to state
    await this.ipfsAdd();
  };

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
                  <Form.Input
                    width={3}
                    label="Name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={event =>
                      this.setState({ name: event.target.value })
                    }
                  />
                  <Form.Input
                    width={1}
                    label="Age"
                    placeholder="Age"
                    value={this.state.age}
                    onChange={event =>
                      this.setState({ age: event.target.value })
                    }
                  />
                  <Form.Input
                    width={3}
                    label="Location"
                    placeholder="Location"
                    value={this.state.location}
                    onChange={event =>
                      this.setState({ location: event.target.value })
                    }
                  />
                </Form.Group>
                <Message
                  error
                  header="Oops!"
                  content={this.state.errorMessage}
                />
              </Form>
              <p>
                Entering your name, age, and location is entirely optional.
                <br />
                <br />
                <em>
                  NOTE: When submitting, there is a slight delay before you can
                  confirm your transaction.
                </em>
              </p>
              <h4>{this.state.ethAddress}</h4>
              <h4>{this.state.userAddress}</h4>
              <Button content="View Submission" onClick={this.getSubmission} />
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
