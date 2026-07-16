import { useState } from "react";
import useProductos from "./hooks/useProductos";
import useCarrito from "./hooks/useCarrito";
import useBackend from "./hooks/useBackend";
import MercadoButton from "./hooks/MercadoButton";

function App() {
  const { productos, cargando } = useProductos();
  const {enviarBackend} = useBackend();
  const {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    aumentarCantidad,
    disminuirCantidad,
    totalCarrito,
    cantidadTotal,
    vaciarCarrito,
  } = useCarrito();


  const [abrirCarrito, setAbrirCarrito] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [mostrarPago, setMostrarPago] = useState(false);
  const [abrirCategorias, setAbrirCategorias] = useState(false);

  const comprar = async () => {
    const id = await enviarBackend(carrito, "TianTest");

    console.log("Preference ID:", id);

    setPreferenceId(id);
    setMostrarPago(true);
}

  const agregarProducto = (producto) => {
    agregarAlCarrito(producto);
    setAbrirCarrito(true);
  };

  if (cargando) return <h2>Cargando productos...</h2>;

  return (

    <div className="app">
      <button className="category-btn" onClick={() => setAbrirCategorias(true)}>☰</button>
      <button className="cart-btn" data-count={cantidadTotal} onClick={() => setAbrirCarrito(true)}>🛒</button>
      <h1>Catálogo de productos</h1>

      <div className="productos-grid">
        {productos.map((producto)=>(

          <div key={producto.id} className="card">
            <img src={producto.thumbnail} alt={producto.title}/>
            <h2>{producto.title}</h2>
            <p>{producto.category}</p>
            <strong><p>stock: {producto.stock}</p></strong>
            <p className="precio">${producto.price}</p>
            <button onClick={() => agregarProducto(producto)}>Agregar al carrito</button>
          </div>
        ))}

      </div>

      {abrirCarrito && (

        <div className="cart-overlay" onClick={() => setAbrirCarrito(false)}>
          <div className="cart-panel" onClick={(e)=>e.stopPropagation()}>

            {carrito.map((item)=>(
              
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title}/>
                <div className="cart-info">

                  <p>{item.title}</p>
                  <p>${item.price}</p>

                  <div className="cantidad">
                    <button onClick={() => disminuirCantidad(item)}>-</button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => aumentarCantidad(item)}>+</button>
                  </div>

                </div>
                <button className="btn-remove" onClick={() => eliminarDelCarrito(item)}>❌</button>
              </div>

            ))}

            {carrito.length > 0 && (

              <>
                <div className="cart-total">
                  <h3>Total: ${totalCarrito}</h3>
                </div>
                <div className="botones-carrito">
                  <button className="vaciar-btn" onClick={vaciarCarrito}>Vaciar carrito</button>
                  <button className="comprar-btn" onClick={comprar}>Comprar</button>
                </div>
                
              </>

            )}

          </div>
        </div>
      )}
      
      {abrirCategorias && (
        <div className="category-overlay" onClick={() => setAbrirCategorias(false)}>
          <div className="category-panel" onClick={(e)=>e.stopPropagation()}>
            
            <h2>Categorías</h2>
            
            <ul>
              <li>Perfumes</li>
              <li>Cosméticos</li>
              <li>Ofertas</li>
              <li>Novedades</li>
            </ul>
          </div>
        </div>
      )}

      {mostrarPago && preferenceId && (
        <div className="modal-overlay" onClick={() => setMostrarPago(false)}>
          <div className="modal-pago" onClick={(e)=>e.stopPropagation()}>
            
            <button className="cerrar-modal" onClick={() => setMostrarPago(false)}>X</button>
            
            <MercadoButton preferenceId={preferenceId}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;