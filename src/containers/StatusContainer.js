import React from 'react';
import { connect } from 'react-redux';

import StatusComponent from '../components/StatusComponent';

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

const mapStateToProps = state => ({ status: state.statusReducer });

function mapDispatchToProps(dispatch) {
    return {
        lvlUpEnd: () => {
          dispatch({ type: 'LVL_UP_END', payload: '' });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusContainer);