import io from 'socket.io-client'

export default function SocketIOClient(callback) {
  const socket = io('/rosbag_socket')

  socket.on('connect', function(){
    console.log(socket.id)
  })

  socket.on('rosbag msg', function(data){
    callback(data)
  })

  socket.on('disconnect', function(){
  })

  return socket
}
