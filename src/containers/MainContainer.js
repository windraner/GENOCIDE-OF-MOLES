import React from 'react';
import { connect } from 'react-redux';

import HoleContainer from './HoleContainer';
import StatusContainer from './StatusContainer';

import { Wrapper, Separator, H1 } from '../components/style/style';

import PropTypes from 'prop-types';

import { 
  PRE_LVL_PAUSE,
  ON_CLICK_PAUSE,
  WIN_CONDITION,
  LOSE_CONDITION,
  GAME_LOOP_SETTINGS,
  GAME_SETTINGS
} from '../constants/constants.js';

let loop;
let pauseCounter = 0;
let gameCounter = 60;
let preLvlPause = false;

class MainContainer extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }
  
  looping = () => {
    clearInterval(loop);
    loop = setInterval(function() {
      
      if(pauseCounter === 0) {
        this.playLvl();

      } else {
        pauseCounter--;
      }

    }.bind(this),GAME_LOOP_SETTINGS);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.startGame);
  }

  componentWillUnmount(prevProps, prevState) {
    document.removeEventListener("keydown", this.startGame);
    document.addEventListener("keydown", this.buttonControll);
  }

  buttonControll = (e) => {  
    switch(e.code) {
        case 'Numpad1':
          this.clickOnBlock(3);
          break;

        case 'Numpad2':
          this.clickOnBlock(4);
          break;

        case 'Numpad3':
          this.clickOnBlock(5);
          break;

        case 'Numpad4':
         this.clickOnBlock(0);
          break;

        case 'Numpad5':
          this.clickOnBlock(1);
          break;

        case 'Numpad6':
          this.clickOnBlock(2);
          break;

        default: 
          return;
    }
  }

  startGame = (e) => {
    if(e.code === "Enter" && this.props.gameStatus.startState === true) {
      this.props.startGame();
      this.preLvlState();
      this.looping();
      document.addEventListener("keydown", this.buttonControll);
    }
  }

  playLvl = () => {
    if(preLvlPause === false) {
      this.preLvlState();
      preLvlPause = true;
      return;
    }
    if(gameCounter === this.props.gameStatus.timer) {
      this.generateLvl();
      this.props.pauseStatus(false);
    }

    gameCounter--;

    if(gameCounter === 0) {
      this.props.addFailedPoint();
      this.resetLvl();
    }
  }

  generateLvl = () => {
    let random = Math.floor(Math.random() * (6));
    this.props.generateLvl(random);
  }

  preLvlState = () => {
    this.setPause(PRE_LVL_PAUSE);
    this.props.generateBasicBlock();
  }

  setPause(value) {
    pauseCounter = value;
    this.props.pauseStatus(true);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.gameStatus.points !== nextProps.gameStatus.points) {
        for(let key in GAME_SETTINGS) {
          if(nextProps.gameStatus.points === +key) {
            this.props.updateTimer(GAME_SETTINGS[key]);
          }
          if(nextProps.gameStatus.points === WIN_CONDITION) {
            this.endGames();
          }
        }
    }
    this.ifFail();
    gameCounter = nextProps.gameStatus.timer;
  }

  resetLvl = () => {
    preLvlPause = false;
  }

  ifFail = () => {
    if(this.props.gameStatus.failed === LOSE_CONDITION) {
      clearInterval(loop);
    } 
  }

  endGames = () => {
    this.props.endGame();
    clearInterval(loop);
  }

  clickOnBlock = (value) => {
    if(pauseCounter > 0) {
      return;
    }
    this.setPause(ON_CLICK_PAUSE);
    this.props.pauseStatus(true);
    if(this.props.blocks[value].status === 'Activ') {
      this.props.addPoint();
      this.props.clickOnTrueBlock(value);
      this.resetLvl();
    } else {
      this.props.addFailedPoint();
      this.resetLvl();
      this.props.clickOnFalseBlock(value);
      if(this.props.gameStatus.gameDifficult >= 6) {
        clearInterval(loop);
        this.props.gameFailed();
      }
    }
  }

  render() {
      return (
          <div style={Wrapper}>
            <h1 style={H1}>Genocide of moles </h1>
            <HoleContainer clickOnBlock={this.clickOnBlock}/>
            <StatusContainer />
            <div style={Separator}></div>
          </div>
      );
  }
}

MainContainer.propTypes = {
  addFailedPoint: PropTypes.func.isRequired,
  addPoint: PropTypes.func.isRequired,
  clickOnFalseBlock: PropTypes.func.isRequired,
  clickOnTrueBlock: PropTypes.func.isRequired,
  endGame: PropTypes.func.isRequired,
  gameFailed: PropTypes.func.isRequired,
  generateBasicBlock: PropTypes.func.isRequired,
  generateLvl: PropTypes.func.isRequired,
  pauseStatus: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
  blocks: PropTypes.object.isRequired,
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
  return {
      blocks: state.holeReducer,
      gameStatus: state.statusReducer
  };
}

function mapDispatchToProps(dispatch) {
    return {
        startGame: () => {
          dispatch({ type: 'START_GAME', payload: false });
        },
        generateBasicBlock: () => {
          dispatch({ type: 'GENERATE_BASIC_BLOCK', payload: '' });
        },
        generateLvl: (value) => {
          dispatch({ type: 'GENERATE_LVL', payload: value });
        },
        updateTimer: (value) => {
          dispatch({ type: 'UPDATE_TIMER', payload: value });
        },
        endGame: () => {
          dispatch({ type: 'END_GAME', payload: '' });
        },
        addPoint: () => {
          dispatch({ type: 'ADD_POINT', payload: '' });
        },
        addFailedPoint: () => {
          dispatch({ type: 'ADD_FAILED_POINT', payload: '' });
        },
        gameFailed: () => {
          dispatch({ type: 'LOSE_GAME', payload: '' });
        },
        clickOnTrueBlock: (value) => {
            dispatch({ type: 'CLICK_ON_TRUE_BLOCK', payload: value});
        },
        clickOnFalseBlock: (value) => {
            dispatch({ type: 'CLICK_ON_FALSE_BLOCK', payload: value});
        },
        pauseStatus: (value) => {
            dispatch({ type: 'PAUSE_STATUS', payload: value});
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);


