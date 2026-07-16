import { useEffect, useState } from "react";

export default function useProductos(){

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(()=>{

        fetch("https://dummyjson.com/products")

        .then(res => res.json())

        .then(data => {
            setProductos(data.products);
        })

        .finally(()=>{
            setCargando(false);
        })

    },[]);

    return {productos, cargando}

}
// Primero crea un estado para guardar los productos y otro para saber si la información sigue cargando
// Cuando el componente se monta, useEffect realiza la petición a la API
// Convierte la respuesta a JSON y guarda el arreglo de productos con setProductos
// Finalmente cambia el estado de carga a false
// Devuelve los productos junto con el indicador de carga para que cualquier componente pueda utilizarlos