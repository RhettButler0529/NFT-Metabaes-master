import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { SET_TOTALSUPPLY } from '../constants/action-types';

const mapStateToProps = state => ({ ...state })

// const mapDispatchToProps = dispatch => ({
//   setTotalSupply: totalSupply => dispatch(setTotalSupply(totalSupply))
// })

const Feature = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false)
  const [tokenNumber, setTokenNumber] = useState(1)
  //const [totalSupply, setTotalSupply] = useState(0)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    console.log(props)
    setShow(true)
  }

  const decreaseTokenNumber = () => {
    if (tokenNumber === 0) {
      return;
    }
    setTokenNumber(tokenNumber - 1)
  }

  const mint = async (numberofTokens) => {
    if (props.metabaesContract) {
 
      const price = Number(props.metabaesPrice)  * numberofTokens 

      const gasAmount = await props.metabaesContract.methods.mintMetabaes(numberofTokens).estimateGas({from: props.walletAddress, value: price})
      console.log("estimated gas",gasAmount)

      console.log({from: props.walletAddress, value: price})
      const _totalSupply = await props.metabaesContract.methods.totalSupply().call()
      // dispatch({type: SET_TOTALSUPPLY, data: _totalSupply})

      props.metabaesContract.methods
            .mintMetabaes(numberofTokens)
            .send({from: props.walletAddress, value: price, gas: String(gasAmount)})
            .on('transactionHash', function(hash){
              console.log("transactionHash", hash)
            })
            .on('receipt', function(receipt) {
              console.log('receipt')
            })
            .on('confirmation', function(confirmationNumber, receipt){
              console.log('confirmation')
              dispatch({type: SET_TOTALSUPPLY, data: parseInt(_totalSupply, 10) + numberofTokens})
            })
            .on('error', console.error)
      // props.setTotalSupply({totalSupply})
      // setTotalSupply(totalSupply)
      // setShow(false)
          
    } else {
        console.log("Wallet not connected")
    }
    
  };

  return (
    <section className="section" id="feature">
      <Container>
        <h1 className="feature-header">WELCOME TO THE METABAES</h1>
        <Row className="justify-content-center">
          <Col lg={8} md={8} sm={12}>
            <div className="title mb-5">
              <h3 className="feature-content">
                "The Metabaes is 10,000 art pieces carefully chosen by Professor Elon. 
                A unique digital collection of diverse NFTs lying on Ethereum Blockchain. Each one is thoughtfully designed, specifically picked, and impeccably shaped. 
                Join us on our adventure and have a good time. 
                Having a Doge Token grants you creative and commercial rights, as well as inclusion in the gang."
              </h3>
              <Row>
                <Col className="feature-btn-group" lg={6} md={6}>
                  <Button size="sm" onClick={handleShow}>
                    MINT
                  </Button>
                  <Button size="sm">
                    JOIN US
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={4} md={4} sm={12}>
            <img src="/images/dog.jpg" alt="" className="feature-img" style={{width: "100%"}} />
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Mint a Metabaes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src="/images/dog1.jpg" alt="" style={{maxWidth: "320px"}}/>
            <div className="mint-number">
              <button type="button" onClick={decreaseTokenNumber}><span aria-hidden="true">-</span></button>
              <Form>
                <Form.Label>
                  { tokenNumber }
                </Form.Label>
                <div>
                  Total minted so far: { props.totalSupply } / { props.maxMetabaes }
                </div>
              </Form>
              <button type="button" onClick={() => setTokenNumber(tokenNumber + 1)}><span aria-hidden="true">+</span></button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => mint(tokenNumber)}>
              Mint
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
}

export default connect(mapStateToProps, null)(Feature);