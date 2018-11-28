#!/usr/bin/env python
# -*- coding: utf-8 -*-

import base64
import numpy as np
import cv2


class CompressedImageParser():

    @staticmethod
    def __convertImageToBase64(image):
        encoded = base64.b64encode(image)
        return encoded

    @classmethod
    def parse_message(cls, msg):
        np_arr = np.fromstring(msg.data, np.uint8)
        image_np = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        res, img = cv2.imencode('.jpg', image_np)
        base64_image = cls.__convertImageToBase64(img)
        return base64_image
