#!/bin/sh

ssh $TWGOLDHOST "sh -c 'tail -f $TWGOLDPATH/log.txt'"
