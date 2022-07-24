import React from 'react';
import ReactDOM from 'react-dom'
import { Container } from "reactstrap";

class Panel extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			height: 0
		};
	}

	componentDidMount() {
		window.setTimeout(() => {
			const el = ReactDOM.findDOMNode(this);
			const height = el.querySelector('.panel__inner').scrollHeight;
			this.setState({
				height
			});
		}, 333);
	}

	render () {
		const { label, content, activeTab, index, activateTab } = this.props;
		const { height } = this.state;
		const isActive = activeTab === index;
		const innerStyle = {
			height:  `${isActive ? height : 0}px`
		}

		return (
			<div className='panel'
				role='tabpanel'
				aria-expanded={ isActive }>
				<button className='panel__label'
					role='tab'
					onClick={ activateTab }>
					{ label }
				</button>
				<div className='panel__inner'
					style={ innerStyle }
					aria-hidden={ !isActive }>
					<p className='panel__content'>
						{ content }
					</p>
				</div>
			</div>
		);
	}
}

class Accordion extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			activeTab: -1
		};
		
		this.activateTab = this.activateTab.bind(this);
	}
	
	activateTab(index) {
		this.setState(prev => ({
			activeTab: prev.activeTab === index ? -1 : index
		}));
	}
	
	render() {
		const { panels } = this.props;
		const { activeTab } = this.state;
		return (
			<div className='accordion' role='tablist'>
				{panels.map((panel, index) =>
					<Panel
						key={ index }
						activeTab={ activeTab }
						index={ index }
						{ ...panel } 
						activateTab={ this.activateTab.bind(null, index) }
					/>
				)}
			</div>
		);
	}
}

const panels = [
	{
		label: 'What is The Doge Pound?',
		content: 'It is a collection of 10,000 unique Doge NFTs on Ethereum Blockchain. Each one is thoughtfully designed, specifically picked, and impeccably shaped.',
	},
	{
		label: 'How was The Doge Pound created?',
		content: 'Each Doge Pound has constructed algorithmically by mixing a variety of properties with different possibilities in the following categories: Background, Clothing, Earring, Eyes, Eyewear, Mouth, Fur, and Hat.',
	},	
	{
		label: 'What is the smart contract address of The Doge Pound?',
		content: 'Verified smart contract address: 0xF4ee95274741437636e748DdAc70818B4ED7d043',
	},
	{
		label: 'What is the smart contract address of Puppy?',
		content: 'Verified smart contract address: 0x73883743Dd9894bd2D43e975465b50DF8d3aF3B2',
	},
	{
		label: 'Who can mint a puppy?',
		content: 'Every doggy holder gets to mint a puppy. 1 doggy = 1 puppy. If you have 5 doggies, you can mint 5 puppies and so on.'
	},

  {
		label: 'How much does minting a puppy cost?',
		content: 'Minting is free for all Doge Pound holders. You will only need to pay for the gas fee.'
	},
  {
		label: 'Choose your own time of minting',
		content: 'Make sure to mint when gas is low. This is going to save you some valuable ETH. Puppies are pre-assigned to crates, so you are not going to miss out when minting in your own time of choice! How cool is that?'
	},
  {
		label: 'When will I be able to mint my puppy?',
		content: 'You will be able to mint on Sept 1 at 7PM EST and any time after that, since minting will be open for an unlimited time.'
	},
  {
		label: 'Do I need a rare doggy to get a rare puppy?',
		content: 'The traits of your puppy will be completely random. If you own the most rare doggy it does not necessarily mean that you will also get the most rare puppy and vice versa.'
	},
  {
		label: 'Will Puppies be revealed instantly?',
		content: "Puppies are waiting in crates. This means that you can decide yourself if you want to reveal your puppy or keep it sealed. When revealed a little fun animation will occur and your puppy's crate will open. This is also the minting process. Shortly after your puppy is revealed and minted, you will be able to see your puppy NFT on OpenSea."
	},
  {
		label: 'If I own multiple doggies, can I open multiple crates at once?',
		content: 'You can open multiple crates at once but only with a maximum of 20 at the same time depending on the number of Doge Pound NFTs you own.'
	},
  {
		label: 'Will the crates also be available on OpenSea?',
		content: "Once you open the crate you'll get a puppy NFT in your wallet which you can see on OpenSea. But it will only appear if you have opened the crate. Unboxed crates cannot be viewed on OpenSea or put for sale. Please note that the crates itself are not NFTs!"
	},
  {
		label: 'How do I know if, when I buy a doggy, the crate is already opened or puppy NFT is minted?',
		content: 'You can check which crates are opened by searching for the corresponding puppy # on the Doge Pound NFT. For example, if you wish to buy Doggy #6901, you can search for Puppy #6901 on The Doge Pound website and check if the crate has already been opened or not.'
	},
];

const Faq = () => {

  return (
    <section className="section" id="faq">
      <Container>
        <h1 className="feature-header">FAQ</h1>
        <Accordion panels={ panels }/>
      </Container>
    </section>
  );
}

export default Faq;