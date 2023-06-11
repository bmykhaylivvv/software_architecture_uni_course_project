#!/bin/bash

echo "Running 'delete from project.users;'..."
echo "delete from project.users;" | mysql -u root

API_URL="http://localhost:8081"
USERNAME="testuser"
PASSWORD="testpassword"

# 1) Register a single user
REGISTER_USER_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"username\":\"${USERNAME}\",\"password\":\"${PASSWORD}\"}" "${API_URL}/register")

if [[ $(echo "$REGISTER_USER_RESPONSE" | jq -r .success) = "true" ]]; then
    echo "Test 1: Register User - PASSED"
else
    echo "Test 1: Register User - FAILED"
    echo "Response: $REGISTER_USER_RESPONSE"
fi

# 2) Test for duplicate registering
DUPLICATE_REGISTER_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"username\":\"${USERNAME}\",\"password\":\"${PASSWORD}\"}" "${API_URL}/register")

if [[ $(echo "$DUPLICATE_REGISTER_RESPONSE" | jq -r .detail) = "Username already exists" ]]; then
    echo "Test 2: Register Duplicate User - PASSED"
else
    echo "Test 2: Register Duplicate User - FAILED"
    echo "Response: $DUPLICATE_REGISTER_RESPONSE"
fi

# 3) Try to log in
LOGIN_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"username\":\"${USERNAME}\",\"password\":\"${PASSWORD}\"}" "${API_URL}/login")
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r .token)

if [ -n "$TOKEN" ]; then
    echo "Test 3: Login - PASSED"
else
    echo "Test 3: Login - FAILED"
    echo "Response: $LOGIN_RESPONSE"
fi

# 4) Log out
LOGOUT_RESPONSE=$(curl -s -X DELETE -H "Authorization: Bearer ${TOKEN}" "${API_URL}/logout")

if [[ $(echo "$LOGOUT_RESPONSE" | jq -r .success) = "true" ]]; then
    echo "Test 4: Logout - PASSED"
else
    echo "Test 4: Logout - FAILED"
    echo "Response: $LOGOUT_RESPONSE"
fi

# 5) Try to log out again
LOGOUT_AGAIN_RESPONSE=$(curl -s -X DELETE -H "Authorization: Bearer ${TOKEN}" "${API_URL}/logout")

if [[ $(echo "$LOGOUT_AGAIN_RESPONSE" | jq -r .detail) = "Invalid token" ]]; then
    echo "Test 5: Logout Again - PASSED"
else
    echo "Test 5: Logout Again - FAILED"
    echo "Response: $LOGOUT_AGAIN_RESPONSE"
fi

# 6) Use invalid password to log in
INVALID_PASSWORD_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"username\":\"${USERNAME}\",\"password\":\"wrongpassword\"}" "${API_URL}/login")

if [[ $(echo "$INVALID_PASSWORD_RESPONSE" | jq -r .detail) = "Invalid username or password" ]]; then
    echo "Test 6: Login with Invalid Password - PASSED"
else
    echo "Test 6: Login with Invalid Password - FAILED"
    echo "Response: $INVALID_PASSWORD_RESPONSE"
fi

# 7) Use invalid username to log in
INVALID_USERNAME_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"username\":\"wrongusername\",\"password\":\"${PASSWORD}\"}" "${API_URL}/login")

if [[ $(echo "$INVALID_USERNAME_RESPONSE" | jq -r .detail) = "Invalid username or password" ]]; then
    echo "Test 7: Login with Invalid Username - PASSED"
else
    echo "Test 7: Login with Invalid Username - FAILED"
    echo "Response: $INVALID_USERNAME_RESPONSE"
fi
