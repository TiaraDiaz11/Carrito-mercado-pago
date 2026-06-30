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