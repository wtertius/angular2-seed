#!/bin/bash

SERVER=root@danceranger.com
DEST=$SERVER:/var/www/danceranger.com

rsync -avz ./src/index.html         $DEST/index.html &
rsync -avz ./dist/main.bundle.js    $DEST/main.bundle.js &
rsync -avz ./src/public/*           $DEST/public/ \
    --exclude-from=./deploy/rsync.exclude --delete &

rsync -avz ./etc/nginx/vhosts/danceranger.com/* $SERVER:/etc/nginx/vhosts/danceranger.com/ \
    --exclude-from=./deploy/rsync.exclude --delete &

sleep 1;
echo;
