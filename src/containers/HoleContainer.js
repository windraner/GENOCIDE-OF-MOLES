import React from 'react';
import { connect } from 'react-redux';

import HoleComponent from '../components/HoleComponent';

import PropTypes from 'prop-types';

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

HoleContainer.propTypes = {
  blocks: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  gameStatus: PropTypes.shape({
    LvlUp: PropTypes.bool.isRequired,
    failed: PropTypes.number.isRequired,
    gameDifficult: PropTypes.number.isRequired,
    isPlay: PropTypes.bool.isRequired,
    onPause: PropTypes.bool.isRequired,
    points: PropTypes.number.isRequired,
    startState: PropTypes.bool.isRequired,
    timer: PropTypes.number.isRequired,
    win: PropTypes.bool.isRequired
  })
};

function mapStateToProps(state) {
  ;
    return {
        blocks: state.holeReducer,
        gameStatus: state.statusReducer
    };
}

export default connect(mapStateToProps)(HoleContainer);