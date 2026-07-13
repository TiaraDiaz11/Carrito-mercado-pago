from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List,Union
from fastapi.middleware.cors import CORSMiddleware
import mercadopago
import os
from dotenv import load_dotenv

app = FastAPI()

class Item(BaseModel):
    id: int
    cantidad: int


class Carrito(BaseModel):
    items: List[Item]


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