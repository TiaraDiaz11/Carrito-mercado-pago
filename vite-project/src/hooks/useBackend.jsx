import axios from "axios"

export default function useBackend() {

    const enviarBackend = async (carrito, user) => {
        console.log("Entró a enviarBackend");
        console.log("Carrito:", carrito);
        console.log("Usuario:", user);

        const parseCarrito = carrito.map(producto => ({ id: producto.id, title: producto.title, unit_price: producto.price, quantity: producto.cantidad }))
        try {
            console.log("Enviando al backend...");

            const res = await axios.post("http://localhost:8000/crear-preferencia", {
                items: parseCarrito,
                user: user
            });

            // 2. Imprimimos exactamente qué nos devolvió Axios
            console.log("Respuesta de Axios:", res);

            // 3. Verificamos la ruta de los datos
            const urlPago = res.data.sandbox_init_point;
            console.log("URL de redirección:", urlPago);

            // 4. Solo redirigimos si la URL existe de verdad
            if (urlPago) {
                window.location.href = urlPago;
            } else {
                console.error("Atención: El backend no devolvió el sandbox_init_point", res.data);
            }

        } catch (error) {
            console.error("Error en la petición:", error);
        }
    }

    return {
        enviarBackend
    }

}