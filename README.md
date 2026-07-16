#  Carrito de Compras con Mercado Pago

Proyecto desarrollado como práctica de una tienda online utilizando **React** para el frontend y **FastAPI** para el backend, integrando **Checkout Pro de Mercado Pago** como pasarela de pagos.

##  Descripción

La aplicación consume productos desde la API pública de DummyJSON y permite al usuario:

- Visualizar un catálogo de productos.
- Agregar productos al carrito.
- Modificar cantidades.
- Eliminar productos.
- Vaciar el carrito.
- Calcular automáticamente el total de la compra.
- Generar una preferencia de pago mediante Mercado Pago.
- Finalizar la compra utilizando Checkout Pro.

---

##  Tecnologías utilizadas

### Frontend

- React
- Vite
- Axios
- CSS

### Backend

- FastAPI
- Python
- Mercado Pago SDK
- python-dotenv

---

## 📁 Estructura del proyecto

```
Carrito-mercado-pago/
│
├── Backend/
│   ├── main.py
│   ├── .env
│   └── requirements.txt
│
└── vite-project/
    ├── src/
    │   ├── hooks/
    │   ├── App.jsx
    │   ├── MercadoButton.jsx
    │   └── main.jsx
    └── package.json
```

---

##  Instalación

### Clonar el repositorio

```bash
git clone https://github.com/TiaraDiaz11/Carrito-mercado-pago.git
```

---

### Backend

Entrar a la carpeta:

```bash
cd Backend
```

Crear entorno virtual:

```bash
python -m venv venv
```

Activarlo:

**Windows**

```bash
venv\Scripts\activate
```

Instalar dependencias:

```bash
pip install -r requirements.txt
```

Crear un archivo `.env`

```env
Token_Desarrollo=TU_ACCESS_TOKEN
```

Iniciar FastAPI

```bash
uvicorn main:app --reload
```

El backend quedará disponible en:

```
http://127.0.0.1:8000
```

---

### Frontend

Entrar a la carpeta:

```bash
cd vite-project
```

Instalar dependencias:

```bash
npm install
```

o utilizando Bun

```bash
bun install
```

Iniciar el proyecto:

```bash
npm run dev
```

o

```bash
bun run dev
```

---

##  Integración con Mercado Pago

El proyecto utiliza Checkout Pro mediante el SDK oficial de Mercado Pago.

Para realizar pruebas es necesario:

- Crear una aplicación en Mercado Pago Developers.
- Obtener una Public Key.
- Obtener un Access Token.
- Configurar cuentas de prueba (Comprador y Vendedor).

El backend genera una **Preference** que posteriormente es utilizada por el componente `Wallet` del frontend para renderizar el botón de pago.

---

##  Funcionalidades

- Catálogo de productos.
- Consumo de API REST.
- Carrito persistente durante la sesión.
- Aumento y disminución de cantidades.
- Eliminación individual de productos.
- Vaciado completo del carrito.
- Cálculo automático del total.
- Integración con Mercado Pago Checkout Pro.
- Comunicación Frontend ↔ Backend mediante Axios.

---

##  API utilizada

Los productos se obtienen desde:

https://dummyjson.com/products

---


## Desarrolladores

- Alan Cortea
- Tiara Díaz
