import React from 'react';
import { HoleWrapper, StartText, EndText, EndImage } from './style/style';

import { LOSE_CONDITION } from '../constants/constants.js';

export default class HoleComponent extends React.Component {
	constructor(props) {
		super();
		this.props = props;
		this.onMouseEnter = this.onMouseEnter.bind(this);
	}

	onMouseEnter(e) {
		e.target.style.cursor = 'pointer';
	}

	handelClick = (e) => {
		this.props.clickOnBlock(e.target.getAttribute('name'));
	}

	render() {
		let content;
		if(this.props.gameStatus.startState) {
			content = <div style={StartText}>Press enter to start</div>;
		} else {
			content = Object.entries(this.props.blocks).map((i, index) => {
			 	let { style, key } = i[1];
			 	return <div key={key} name={key} style={style} onClick={this.handelClick} onMouseEnter={this.onMouseEnter}></div>;
			});
		}
		if(this.props.gameStatus.win) {
			content =
				<div>
					<div style={EndText}>You start a mass genocide of moles</div>
					<img alt='KK' src='3.png' style={EndImage} />
				</div>;
		}
		if(this.props.gameStatus.failed >= LOSE_CONDITION) {
			content = <div style={StartText}>wasted</div>;
		}
		
		return (
			<div style={HoleWrapper}>
				{content}
			</div>
		)
	}
}

