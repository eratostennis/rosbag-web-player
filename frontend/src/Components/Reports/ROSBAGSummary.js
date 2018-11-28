import React from 'react'

import LinearProgress from '@material-ui/core/LinearProgress'


export default class Player extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      summary:props.summary
    }
  }

  componentWillMount() {
  }

  render () {
    const {summary} = this.props
    if (summary) {
      return (
        <div id='rosbag-info'>
          <p>start: { summary['start'] }</p>
          <p>end: { summary['end'] }</p>
          <p>duration: { summary['duration'] } sec</p>
          <p>size: { summary['size'] } B</p>
          <p>messages: { summary['messages'] }</p>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}
