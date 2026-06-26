import { useEffect, useState } from "react";

function Productos() {

  const [productos, setProductos] = useState([]);

  useEffect(() => {

    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        setProductos(data.products);
      })
      .catch(error => console.log(error));

  }, []);


  return (
    <div>
      {productos.map(producto => (

        <div key={producto.id}>

          <img 
            src={producto.thumbnail} 
            alt={producto.title}
            width="150"
          />

          <h2>{producto.title}</h2>

          <p>${producto.price}</p>

          <button>Agregar al carrito</button>

        </div>

      ))}
    </div>
  );
}

export default Productos;