import jwt
import sys
import json
import consul
import pymongo
import logging
import hazelcast
import logging.config
import mysql.connector
from dotenv import dotenv_values
from fastapi import HTTPException

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler(sys.stdout))

class BaseService:
    def __init__(self, service_name: str, port: int, hz_enabled=False, mongo_enabled=False, mysql_enabled=False) -> None:
        self.service_definition = {
            "name": service_name,
            "service_id": f"{service_name}_{port}",
            "address": "127.0.0.1",
            "port": port,
            "check": {
                "http": f"http://127.0.0.1:{port}/health",
                "interval": "10s"
            }
        }
        self.consul_client = consul.Consul()
        self.jwt_secret = dotenv_values(".env").get("JWT_SECRET_KEY")

        self.hz_enabled = hz_enabled
        if self.hz_enabled:
            self.hz_client = hazelcast.HazelcastClient(
                cluster_members=json.loads(self.consul_client.kv.get("hazelcast-cluster-members")[1]['Value']),
                cluster_name=self.consul_client.kv.get("hazelcast-cluster-name")[1]['Value'].decode()
            )

        self.mongo_enabled = mongo_enabled
        if self.mongo_enabled:
            self.mongo_client = pymongo.MongoClient("mongodb://localhost:27017/")
            self.mongo_db = self.mongo_client['sa_project']

        self.mysql_enabled = mysql_enabled
        if self.mysql_enabled:
            self.mysql_connection = mysql.connector.connect(
                host="localhost",
                user="admin",
                password="admin",
                database="project"
            )

    def check_auth_token(self, authorization: str):
        if authorization is None or not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid authorization header")

        jwt_token = authorization.split("Bearer ")[1]
        try:
            jwt_decoded = jwt.decode(jwt_token, self.jwt_secret, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Expired token")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")

        if self.mongo_db['logged_out'].find_one({"token": jwt_token}) is not None:
            raise HTTPException(status_code=401, detail="Invalid token")

        return jwt_token, jwt_decoded

    def register_service(self):
        self.consul_client.agent.service.register(**self.service_definition)
        logger.info("Service registered in Consul.")

    def deregister_and_shutdown(self):
        if self.hz_enabled:
            self.hz_client.shutdown()
        if self.mongo_enabled:
            self.mongo_client.close()
        if self.mysql_enabled:
            self.mysql_connection.disconnect()
        self.consul_client.agent.service.deregister(self.service_definition["service_id"])
        logger.info("Service removed from Consul.")