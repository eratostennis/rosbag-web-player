import React from 'react'
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    msg: state.rosMsgReducer.msg,
  }
}
const mapDispatch = () => ({});


export class ImageReport extends React.Component {

  constructor (props) {
    super(props)
  }

  componentWillMount() {
  }

  render () {
    var blob = null
    if (this.props.msg) {
      blob = this.props.msg.parsed_msg
    }
    if ( blob ) {
      var url = 'data:image/jpeg;base64,'+ blob
    }
    const style = {
      width: '100%',
      height: '100%'
    }
    return (
      <div>
        <img style={ style } src={ url } />
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatch)(ImageReport)
