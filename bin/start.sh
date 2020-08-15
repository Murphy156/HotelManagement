#!/bin/bash

set -x
source /etc/profile

CURR_DIR=`dirname "$0"`
CURR_DIR=`cd "$CURR_DIR";pwd`

export PYTHONPATH=${CURR_DIR}/..
cd ${CURR_DIR}/../core
python3 run.py
