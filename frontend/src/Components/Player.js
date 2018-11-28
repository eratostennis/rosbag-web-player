import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import PlayArrow from 'material-ui-icons/PlayArrow'
import Stop from 'material-ui-icons/Stop'
import Pause from 'material-ui-icons/Pause'

import { socketIOConnect, receiveMsg } from '../Reducers/rosMsgReducer'


const mapStateToProps = state => {
  return {
    sioClient: state.rosMsgReducer.sioClient,
  }
}


export class Player extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rate: 2,
      current: {
        timestamp_progress: 0
      }
    }
  }

  componentWillMount() {
    this.props.socketIOConnect(this.receiveMessage.bind(this))
  }

  receiveMessage(msg) {
    this.props.receiveMsg(msg)
  }

  handlePlay() {
    const skip_sec = 1/this.state.rate
    this.props.sioClient['sub'].emit("subscribe", skip_sec)
    this.props.sioClient['pub'].emit("play", skip_sec)
  }

  handleStop() {
    this.props.sioClient['pub'].emit("stop", "stop")
  }

  handlePause() {
    this.props.sioClient['pub'].emit("pause", "pause")
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="default" onClick={this.handleStop.bind(this)}>
          <Stop />
        </Button>
        <Button variant="contained" color="default" onClick={this.handlePlay.bind(this)}>
          <PlayArrow />
        </Button>
        <Button variant="contained" color="default" onClick={this.handlePause.bind(this)}>
          <Pause />
        </Button>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({

})
export default connect(mapStateToProps, {socketIOConnect, receiveMsg})(Player)
