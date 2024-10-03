import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas");
        if (!response.ok) {
          throw new Error("Error fetching pizzas");
        }
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Menú de Pizzas</h2>
      <div className="row">
        {pizzas.map((pizza) => (
          <div className="col-md-4" key={pizza.id}>
            <div className="card mb-3">
              <img src={pizza.img} className="card-img-top" alt={pizza.name} />
              <div className="card-body">
                <h5 className="card-title">{pizza.name}</h5>
                <p className="card-text">{pizza.desc}</p>
                <p><strong>Precio: ${pizza.price.toLocaleString()}</strong></p>
                {}
                <button 
                  className="btn btn-success" 
                  onClick={() => addToCart(pizza)}
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
