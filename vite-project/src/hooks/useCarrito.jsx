import { useEffect, useMemo, useState } from "react";
export default function useCarrito() {

// Estado del carrito
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carritoItem");
    return guardado ? JSON.parse(guardado) : [];
  });

// Guardar cambios automaticamente
  useEffect(() => {
    localStorage.setItem("carritoItem", JSON.stringify(carrito));
  }, [carrito]);

// Agregar producto
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);

// Si existe recorre todos los productos 
      if (existe) {
        return prev.map((item) =>  //Prev: carrito actual antes del cambio, luego crea el nuevo array
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

// Si  no existe el ...prev conserva los productos anteriores
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

// Recibe el producto a borrar y filter crea un nuevo array
  const eliminarDelCarrito = (producto) => { 
    setCarrito((prev) =>
      prev.filter((item) => item.id !== producto.id)
    );
  };

// Cuando tocas el boton +, recorre el carrito, y agrega de a uno
  const aumentarCantidad = (producto) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)
    );
  };

// Hace lo contrario y si llega a cero lo elimina
  const disminuirCantidad = (producto) => {
    setCarrito((prev) =>
      prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad - 1 } : item)
        .filter((item) => item.cantidad > 0)
    );
  };

// Calcula cuanta plata hay
  const totalCarrito = useMemo(() => {
    return carrito.reduce(
      (total, item) => total + item.price * item.cantidad, 0);
    }, [carrito]);

// Sirve para el numero del carrito
  const cantidadTotal = useMemo(() => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  }, [carrito]);

// Vacia el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

// Retornar funciones para que el App.jsx pueda llamar a cada una
  return {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    aumentarCantidad,
    disminuirCantidad,
    totalCarrito,
    cantidadTotal,
    vaciarCarrito,
  };

}