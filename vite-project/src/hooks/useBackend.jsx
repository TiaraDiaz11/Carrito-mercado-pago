import axios from "axios"

export default function useBackend() {

    const enviarBackend = async (carrito, user) => {
        console.log("Entró a enviarBackend");
        console.log("Carrito:", carrito);
        console.log("Usuario:", user);

        const parseCarrito = carrito.map(producto => ({ id: producto.id, title: producto.title, unit_price: producto.price, quantity: producto.cantidad }))
        try {
            console.log("Enviando al backend...");

            const res = await axios.post("http://localhost:8000/carrito", {
                items: parseCarrito,
                user: user
            });

            // 2. Imprimimos exactamente qué nos devolvió Axios
            console.log("Respuesta de Axios:", res);

            const preferenceId = res.data.id;
            console.log("Preference ID:", preferenceId);
            
            return preferenceId;

        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }

    return {
        enviarBackend
    }

}