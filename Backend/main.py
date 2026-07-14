from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List,Union
from fastapi.middleware.cors import CORSMiddleware
import mercadopago
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

origins = [
    "http://localhost:5173"

]

class ItemCarrito(BaseModel):
    id: Union[int, str]
    title: str
    unit_price: float
    quantity: int


class Carrito(BaseModel):
    items: List[ItemCarrito]
    user: str


@app.get("/")
def inicio():
    return {
        "mensaje": "Backend funcionando"
    }

@app.post("/crear-preferencia")
async def crear_preferencia(carrito: Carrito):

    return {
        "mensaje": "Carrito recibido",
        "items": carrito.items
    }