#!/bin/bash

SERVER=root@danceranger.com
DEST=$SERVER:/var/www/danceranger.com

rsync -avz ./src/index.html         $DEST/index.html
rsync -avz ./dist/main.bundle.js    $DEST/main.bundle.js
rsync -avz ./src/public/*           $DEST/public/ --exclude=raw --exclude=video.txt

rsync -avz ./etc/nginx/vhosts/danceranger.com/nginx.conf $SERVER:etc/nginx/vhosts/danceranger.com/nginx.conf
