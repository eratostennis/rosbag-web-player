#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
from flask import Flask, render_template, send_file, jsonify, request
from flask_socketio import SocketIO, emit
from logging import getLogger, StreamHandler, DEBUG

from rosbag_manager import ROSBAGManager

app = Flask(__name__,
        static_folder='../frontend/dist/',
        static_url_path='/static',
        template_folder='../frontend/',
        )
socketio = SocketIO(app)
logger = getLogger(__name__)
handler = StreamHandler(sys.stdout)
handler.setLevel(DEBUG)
logger.setLevel(DEBUG)
logger.addHandler(handler)

# TODO: prepare multiple controllers for each clients
controller = {'status': 'STOP', 'current_timestamp': None, 'current_msg_index': None}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/pcd')
def get_pcd():
    filename = '../data/Zaghetto.pcd'
    return send_file(filename)

@app.route('/api/set_rosbag')
def set_rosbag():
    # TODO: kick worker and download data
    rosbag = '/home/vagrant/test.bag'
    rosbag_info = ROSBAGManager(rosbag).get_info()
    return jsonify(rosbag_info)

@socketio.on('connect', namespace='/rosbag_socket')
def set_websocket():
    print('websocket connected ({}).'.format(request.sid))

@socketio.on('subscribe', namespace='/rosbag_socket')
def launch(data):
    logger.debug('-------- subscribe ({}) ----------'.format(request.sid))
    rosbag_manager = ROSBAGManager('/home/vagrant/test.bag', controller)
    def callback(data):
        socketio.emit('rosbag msg', data, namespace='/rosbag_socket')
    rosbag_manager.play(socketio, callback)

@socketio.on('play', namespace='/rosbag_socket')
def play_message(skip_sec):
    logger.debug('-------- play ----------')
    controller['status'] = 'PLAYING'

@socketio.on('pause', namespace='/rosbag_socket')
def pause_message(json):
    logger.debug('-------- pause ----------')
    controller.update({'status': 'PAUSE'})

@socketio.on('stop', namespace='/rosbag_socket')
def stop_message(json):
    logger.debug('-------- stop ----------')
    controller.update({'status': 'STOP'})


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port='3000')
