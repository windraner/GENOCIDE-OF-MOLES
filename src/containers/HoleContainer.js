import React from 'react';
import { connect } from 'react-redux';

import HoleComponent from '../components/HoleComponent';

export class HoleContainer extends React.Component {
	constructor(props) {
    super();
    this.props = props;
  }

  render() {

		return (
			<HoleComponent 
                blocks={this.props.blocks}
                gameStatus={this.props.gameStatus}
                clickOnBlock={this.props.clickOnBlock}
            />
		)
  }
}

function mapStateToProps(state) {
    return {
        blocks: state.holeReducer,
        gameStatus: state.statusReducer
    };
}

export default connect(mapStateToProps)(HoleContainer);