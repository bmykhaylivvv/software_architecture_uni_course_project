#!/bin/bash

# MongoDB
mongosh <<EOF
use sa_project
db.createCollection("logged_out")
EOF

# MySQL
mysql -u root <<EOF
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
CREATE DATABASE project;
GRANT ALL PRIVILEGES ON project.* TO 'admin'@'localhost';
EOF

mysql -u root < schemas/announcement.sql
mysql -u root < schemas/users.sql

python3 setup.py
