import socket
import json
import time

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    sock.connect(('127.0.0.1', 7861))

    command = {}
    command['type'] = 'read_tile'
    command['tile_x'] = 161
    command['tile_y'] = 93


    json_command = json.dumps(command)
    json_command = json_command + 'END'
    sock.sendall(json_command.encode())

    print('sent data')
    test = sock.recv(4096)
    print(test)

    command = {}
    command['type'] = 'read_identifier_from_object'
    command['object_id'] = 2
    command['object_type'] = 'small_scenery'

    print('testing read_images_from_object')
    json_command = json.dumps(command)
    json_command = json_command + 'END'
    sock.sendall(json_command.encode())

    result = bytearray()
    packet = b''
    while not b'END' in packet:
        packet = sock.recv(4096)
        result.extend(packet)

    print(result)
except:
    print('error')