import React from 'react'
import GridLayout from 'react-grid-layout';

import PCDReport from './Reports/PCDReport'
import ImageReport from './Reports/ImageReport'
import ROSBAGSummary from './Reports/ROSBAGSummary'
import NavBar from './Commons/NavBar'
import Player from './Player'

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';


export default class DashboardPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    this.setState({layout: [
      // {i: 'pcd-a', x: 0, y: 0, w: 1, h: 2, static: true, minW: 6, maxW: 6},
      {i: 'pcd', x: 0, y: 0, w: 4, h: 2},
      {i: 'front-image', x: 4, y: 0, w: 4, h: 2},
      {i: 'rear-image', x: 9, y: 0, w: 4, h: 2}
    ]})
  }

  handlePageMove(path) {
    this.props.history.push(path)
  }

  onLayoutChange (layout, layouts) {
    this.setState({layout: layout})
  }

  render() {

    var aW = (this.state.layout[0].w/12)*1200 - 12
    var aH = (this.state.layout[0].h)*120 + 10
    var bW = (this.state.layout[1].w/12)*1200 - 12
    var bH = (this.state.layout[1].h)*120 + 10
    var cW = (this.state.layout[2].w/12)*1200 - 12
    var cH = (this.state.layout[2].h)*120 + 10

    return (
      <div>
        <NavBar />
        <ROSBAGSummary />
        <Player />
        <GridLayout className='layout' layout={this.state.layout} cols={12} rowHeight={120} width={1200} onLayoutChange={this.onLayoutChange.bind(this)}>
          <div key='pcd' style={{backgroundColor: 'black'}}><PCDReport width={bW} height={bH} /></div>
          <div key='front-image' style={{backgroundColor: '#ffc400'}}><ImageReport /></div>
          <div key='rear-image' style={{backgroundColor: '#ffc400'}}><ImageReport /></div>
        </GridLayout>
      </div>
    )
  }
}
