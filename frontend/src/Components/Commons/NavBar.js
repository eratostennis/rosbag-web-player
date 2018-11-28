import React from 'react'
import { AppBar,Toolbar, Button } from 'material-ui'
import Typography from 'material-ui/Typography'


export default class NavBar extends React.Component {
  render() {
    return ( 
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Typography type='title' color='inherit'>
            Dashboard
          </Typography>
          <Button style={{color:'#fff',position:'absolute',top:15,right:0}} onClick={()=> this.handlePageMove('/user')}>Userページへ</Button>
        </Toolbar>
      </AppBar>
    )
  }
}
