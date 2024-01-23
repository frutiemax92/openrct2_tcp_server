import socket
import json
import time

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    sock.connect(('127.0.0.1', 7860))

    command = {}
    command['type'] = 'read_tile'
    command['tile_x'] = 161
    command['tile_y'] = 93

    json_command = json.dumps(command).encode()
    sock.sendall(json_command)

    print('sent data')
    test = sock.recv(4096)
    print(test)

    command = {}
    command['type'] = 'read_path_from_object'
    command['object_id'] = 2
    command['object_type'] = 'small_scenery'

    print('testing read_images_from_object')
    json_command = json.dumps(command).encode()
    sock.sendall(json_command)

    result = bytearray()
    while True:
        test = sock.recv(4096)
        result.extend(test)
        if len(test) < 4096:
            break

    print(result)
except:
    print('error')