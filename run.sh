#!/bin/bash

# start python services
service_filenames=(user-authentication)
screen_names=(user-authentication)
start_port=8081
for ((i=0; i<${#service_filenames[@]}; i++)); do
    screen_name=${screen_names[i]}
    s_filename=${service_filenames[i]}
    port=$((i+start_port))
    if ! $(screen -list | grep $screen_name > /dev/null); then
        echo "Starting $screen_name ($s_filename) on port $port..."
        echo logfile screenlogs/$screen_name.screenlog > screenlogs/$screen_name-config
        screen -L -c screenlogs/$screen_name-config -S $screen_name -d -m bash -c "cat .env | python3 -m services.$s_filename.controller --port $port"
    fi
done

sleep 5
