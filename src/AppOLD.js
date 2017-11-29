import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {

  addTrack = () => {
    this.props.onAddTrack(this.trackInput.value);
    this.trackInput.value = '';
  }

  findTrack = () => {
    this.props.onFindTrack(this.searchInput.value);
    this.trackInput.value = '';
  }

  render() {
    return (
      <div>
        <div>
          <input type="text" ref={(input) => { this.trackInput = input }} />
          <button onClick={this.addTrack}>Add track</button>
        </div>
        <div>
          <input type="text" ref={(input) => { this.searchInput = input }} />
          <button onClick={this.findTrack}>Find track</button>
        </div>
        <div>
          <button onClick={this.props.onGetTracks}>Get tracks</button>
        </div>
        <ul>
          {this.props.tracks.map((track, index) =>
            <li key={index}>{track.name}</li>
          )}
        </ul>
        
      </div>
    );
  }
}

export default connect(
  state => ({
    tracks: state.tracks.filter(track => track.name.includes(state.filterTracks)),
  }),
  dispatch => ({
    onAddTrack: (name) => {
      const payload = {
        id: Date.now().toString(),
        name
      };
      dispatch({ type: 'ADD_TRACK', payload });
    },
    onFindTrack: (name) => {
      dispatch({ type: 'FIND_TRACK', payload: name });
    },
    onGetTracks: () => {
      const asyncGetTracks = () => dispatch => {
          setTimeout(() => {
            console.log('I got tracks');
            dispatch({ type: 'FETCH_TRACKS_SUCCESS', payload: [] });
          }, 2000)
        }
      
      dispatch(asyncGetTracks());
    } 
  })
)(App);
