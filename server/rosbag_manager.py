#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rosbag.bag import Bag
import rosbag
import yaml
import importlib
import time


class UnknownControllerStatus(Exception): pass


class ROSBAGManager():
    def __init__(self, rosbag, controller):
        self.rosbag = rosbag
        self.controller = controller
        self.topic_name_msg_map = {
                '/sampled/image_raw/compressed': 'sensor_msgs/CompressedImage'
                }
        self.msg_parser_name_map = {
                'sensor_msgs/CompressedImage': 'parsers.cores.compressed_image' 
                }
        self.modules = {}
        self.__prepare_modules()

    def get_info(self):
        info_dict = yaml.load(Bag(self.rosbag, 'r')._get_yaml_info())
        return info_dict

    def __prepare_modules(self):
        for msg_type, module_name in self.msg_parser_name_map.items():
            self.modules[msg_type] = importlib.import_module(module_name)

    @staticmethod
    def __generator(iterable, start=0, skip=0):
        count = 0
        it = iter(iterable)
        while True:
            if start <= count:
                yield next(it)
                for _ in range(skip):
                    next(it)
            else:
                next(it)
            count += 1

    def play(self, socketio, msg_callback):
        while True:
            with rosbag.Bag(self.rosbag) as bag:
                bag_iterator = bag.read_messages(topics=self.topic_name_msg_map.keys())
                for topic, msg, t in self.__generator(bag_iterator):
                    if self.controller['status'] == 'PLAYING':
                        parsed_msg = self.modules[self.topic_name_msg_map[topic]].CompressedImageParser.parse_message(msg)
                        msg_callback({'topic': topic, 'parsed_msg': parsed_msg})
                        socketio.sleep(1)
                    elif self.controller['status'] == 'STOP':
                        break
                    elif self.controller['status'] == 'PAUSE':
                        while self.controller['status'] == 'PAUSE':
                            socketio.sleep(1)
                    elif self.controller['status'] != 'PAUSE':
                        raise UnknownControllerStatus

            self.controller.update({'status': 'STOP'})
            socketio.sleep(1)


if __name__ == '__main__':
    import json
    rosbag_manager = ROSBAGManager('/home/vagrant/test.bag', {'status': 'STOP'})

    # rosbag info
    info = rosbag_manager.get_info()
    print(json.dumps(info))
