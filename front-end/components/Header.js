import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import {
  SET_MAXMETABAES,
  SET_METABAESCONTRACT,
  SET_METABAESPRICE,
  SET_SIGNEDIN,
  SET_TOTALSUPPLY,
  SET_WALLETADDRESS
} from '../constants/action-types';

import { ADDRESS, ABI } from '../config';

const Header = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  
  // FOR WALLET
  const [signedIn, setSignedIn] = useState(false)
  // const [walletAddress, setWalletAddress] = useState(null)

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    if (window.scrollY > 90) {
      setSticky(true);
    } else if (window.scrollY < 90) {
      setSticky(false);
    }
  }

  const connectMetamask = () => {
    signIn()
  }

  const disconnectMetamask = () => {
    signOut()
  }

  const signIn = async () => {
    if (typeof window.web3 !== 'undefined') {
      // Use existing gateway
      window.web3 = new Web3(window.ethereum);
     
    } else {
      alert("No Ethereum interface injected into browser. Read-only access");
    }

    window.ethereum.enable()
      .then(function (accounts) {
        window.web3.eth.net.getNetworkType()
        // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
        .then((network) => {console.log(network);if(network != "rinkeby"){ alert("You are on " + network+ " network. Change network to rinkeby or you won't be able to do anything here")} });  
        let wallet = accounts[0]
        //setWalletAddress(wallet)
        setSignedIn(true)
        dispatch({type: SET_SIGNEDIN, data: true});
        dispatch({type: SET_WALLETADDRESS, data: wallet});
        callContractData(wallet)
      })
      .catch(function (error) {
        // Handle error. Likely the user rejected the login
        console.error(error)
      })
  }
  //
  const signOut = async () => {
    setSignedIn(false)
  }

  const callContractData = async (wallet) => {
    // let balance = await web3.eth.getBalance(wallet);
    // setWalletBalance(balance)
    const metabaesContract = new window.web3.eth.Contract(ABI, ADDRESS)
    dispatch({type: SET_METABAESCONTRACT, data: metabaesContract})

    // const salebool = await metabaesContract.methods.saleIsActive().call() 
    // console.log("saleisActive" , salebool)
    //setSaleStarted(salebool)
    // dispatch({type: SET_SALESTARTED, data: salebool})

    const maxMetabaes = await metabaesContract.methods.MAX_METABAES().call()
    // console.log('maxMetabaes', maxMetabaes)
    dispatch({type: SET_MAXMETABAES, data: maxMetabaes})

    const totalSupply = await metabaesContract.methods.totalSupply().call() 
    //setTotalSupply(totalSupply)
    // console.log('total', totalSupply)
    dispatch({type: SET_TOTALSUPPLY, data: totalSupply})

    const metabaesPrice = await metabaesContract.methods.metabaesPrice().call() 
    //setNFHeroPrice(nfheroPrice)
    // console.log('price', metabaesPrice)
    dispatch({type: SET_METABAESPRICE, data: metabaesPrice})
   
  }

  return (
    <div className={`header${sticky ? ' sticky' : ''}`}>
      <Navbar light expand="md">
        <Container>
          <NavbarBrand href="/">
            <img src="/images/logo.png" alt="" style={{width: "100px"}}/>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#faq">FAQ</NavLink>
              </NavItem>
              <NavItem>
                {!signedIn ? <Button size="sm" onClick={connectMetamask}>CONNECT WALLET</Button>
                :
                <Button size="sm" onClick={disconnectMetamask}>DISCONNECT WALLET</Button>}
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;