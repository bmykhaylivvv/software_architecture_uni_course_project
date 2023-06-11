import jwt
from .domain import User
from passlib.hash import bcrypt
from dotenv import dotenv_values
from fastapi import HTTPException
from datetime import datetime, timedelta
from ..fastapi_base.service_base import BaseService

class AuthenticationService(BaseService):
    service_name: str = "user-authentication"

    def __init__(self, port: int) -> None:
        super().__init__(self.service_name, port, hz_enabled=True, mongo_enabled=True, mysql_enabled=True)
        self.logout_tokens = self.mongo_db["logout_tokens"]
        self.salt = dotenv_values(".env").get("PASSWORD_SALT")

    def login(self, user: User):
        """
        - Get password hash from MySQL database based on the provided username
        - Compare the hashed password with the provided password
        - If the password matches, return a JWT token
        - Otherwise, raise an HTTPException
        """
        cursor = self.mysql_connection.cursor()
        cursor.execute("SELECT id, password_hash FROM users WHERE username = %s", (user.username,))
        result = cursor.fetchone()

        if result is None:
            raise HTTPException(status_code=401, detail="Invalid username or password")

        user_id, password_hash = result

        if bcrypt.using(salt=bcrypt.normhash(self.salt)).verify(user.password, password_hash):
            expires_at = datetime.utcnow() + timedelta(days=30)

            jwt_token = jwt.encode(
                {"user_id": user_id, "exp": expires_at},
                self.jwt_secret,
                algorithm="HS256"
            )

            return jwt_token
        else:
            raise HTTPException(status_code=401, detail="Invalid username or password")

    def register(self, user: User):
        """
        - Check if the current user already exists, otherwise raise HTTPException
        - Insert new user data into the MySQL user table
        """
        cursor = self.mysql_connection.cursor()
        cursor.execute("SELECT COUNT(*) FROM users WHERE username = %s", (user.username,))
        result = cursor.fetchone()

        if result[0] > 0:
            raise HTTPException(status_code=409, detail="Username already exists")

        cursor.execute(
            "INSERT INTO users (username, password_hash) VALUES (%s, %s)",
            (user.username, bcrypt.using(salt=bcrypt.normhash(self.salt)).hash(user.password))
        )
        self.mysql_connection.commit()
    
    def logout(self, token):
        """
        Add the token to the MongoDB collection of logged out tokens
        """
        self.mongo_db['logged_out'].insert_one({"token": token})
