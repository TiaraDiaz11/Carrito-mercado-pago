from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List,Union
from fastapi.middleware.cors import CORSMiddleware
import mercadopago
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

MercadoPago_Token = os.getenv("Token_Desarrollo")

sdk = mercadopago.SDK(MercadoPago_Token)

class ItemCarrito(BaseModel):
    id: Union[int, str]
    title: str
    unit_price: float
    quantity: int


class Carrito(BaseModel):
    items: List[ItemCarrito]
    user: str

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # Permite solicitudes de estos dominios
    allow_credentials=True,      # Permite cookies y encabezados de autenticación
    allow_methods=["*"],         # Permite todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],         # Permite todos los encabezados HTTP
)

@app.get("/")
def inicio():
    return {
        "mensaje": "Backend funcionando"
    }

@app.post("/carrito")
def post_carrito(carrito: Carrito):

    preference_data = {
    "items": [
        {
            "title": item.title,
            "quantity": item.quantity,
            "unit_price": item.unit_price,
        }
        for item in carrito.items
        ]
    }
    preference_response = sdk.preference().create(preference_data)

    preference = preference_response["response"]
    return {
        "id": preference["id"],
        "init_point": preference["init_point"],
        "sandbox_init_point": preference["sandbox_init_point"]
    }