import uvicorn
from .domain import User, JWTToken
from fastapi import FastAPI, Header
from .service import AuthenticationService
from ..fastapi_base.helpers import setup_and_parse_args

args = setup_and_parse_args()

app = FastAPI()

auth_service = AuthenticationService(args.port)

@app.post("/login")
def login(user: User):
    token = auth_service.login(user)
    return JWTToken(token=token)

@app.post("/register")
def register(user: User):
    auth_service.register(user)
    return {"success": "true"}

@app.delete("/logout")
def logout(authorization: str = Header(None)):
    token, _ = auth_service.check_auth_token(authorization)
    auth_service.logout(token)
    return {"success": "true"}

@app.on_event("startup")
async def startup_event():
    auth_service.register_service()

@app.on_event("shutdown")
async def shutdown_event():
    auth_service.deregister_and_shutdown()

@app.get("/health")
async def check_health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(f"services.{auth_service.service_name}.controller:app", port=args.port, reload=True)
