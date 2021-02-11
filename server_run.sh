#!/bin/bash

cd xmeme-server

npm install

NODE_ENV=testing node server.js