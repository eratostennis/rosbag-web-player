import React from 'react'
import * as THREE from 'three'

import { AppBar,Toolbar, Button } from 'material-ui'
import Typography from 'material-ui/Typography'

import PCDLoader from '../../Services/PCDLoader'
import TrackballControls from '../../Services/TrackballControls'


export default class PCDReport extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      width:props.width,
      height:props.height,
    }
  }

  receiveMessage(msg) {
    console.log(msg)
  }

  componentDidMount() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x000000 );
    this.camera = new THREE.PerspectiveCamera( 15, this.state.width / this.state.height, 0.01, 40 );
    this.camera.position.x = 0.4;
    this.camera.position.z = - 2;
    this.camera.up.set( 0, 0, 1 );
    this.controls = new TrackballControls( this.camera );
    this.controls.rotateSpeed = 2.0;
    this.controls.zoomSpeed = 0.3;
    this.controls.panSpeed = 0.2;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    this.controls.minDistance = 0.3;
    this.controls.maxDistance = 0.3 * 100;
    this.scene.add( this.camera );
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.state.width, this.state.height );
    this.renderer.setClearColor(0x333333, 1.0);

    this.container = document.getElementById( 'pcd-canvas' );
    this.container.appendChild( this.renderer.domElement );

    var loader = new PCDLoader()
    var loadCallback = function ( mesh ) {
      mesh.material.color.setHex( Math.random() * 0xffffff )
      this.scene.add( mesh );
      var center = mesh.geometry.boundingSphere.center;
      this.controls.target.set( center.x, center.y, center.z );
      this.controls.update();
      this.renderer.render( this.scene, this.camera )
      this.animate()
    }.bind(this)

    loader.load(
      '/api/pcd',
      loadCallback,
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      function ( error ) {
        console.log( 'An error happened' );
      }
    );
  }

  animate() {
    if ( this.camera !== null && this.controls !== null ) {
      requestAnimationFrame( this.animate.bind(this) );
      this.renderer.render( this.scene, this.camera )
      this.controls.update();
    }
  }

  render () {
    if (this.renderer) {
      this.renderer.setSize( this.props.width, this.props.height );
    }
    return (
      <div>
        <div id="pcd-canvas" />
      </div>
    )
  }
}
