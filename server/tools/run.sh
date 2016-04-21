#!/bin/sh

ssh -n -f $TWGOLDHOST "sh -c 'cd $TWGOLDPATH; nohup ./twgold >> log.txt 2>&1 &'"
