import React from 'react';
import { connect } from 'react-redux';

import StatusComponent from '../components/StatusComponent';

import PropTypes from 'prop-types';

export class StatusContainer extends React.Component {
	constructor(props) {
    super();
    this.props = props;
  }

  lvlUpEnd = () => {
    this.props.lvlUpEnd();
  }


  render() {
		return (
			<StatusComponent 
          status={this.props.status}
          lvlUpEnd = {this.lvlUpEnd}
      />
		)
  }
}

StatusComponent.propTypes = {
  lvlUpEnd: PropTypes.func.isRequired,
  status: PropTypes.shape({
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

const mapStateToProps = state => ({ status: state.statusReducer });

function mapDispatchToProps(dispatch) {
    return {
        lvlUpEnd: () => {
          dispatch({ type: 'LVL_UP_END', payload: '' });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusContainer);