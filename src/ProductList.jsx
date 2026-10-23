import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const plants = [
  { id: 1, name: "Snake Plant", price: 18, category: "Easy Care", image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b6a?w=600" },
  { id: 2, name: "ZZ Plant", price: 22, category: "Easy Care", image: "https://images.unsplash.com/photo-1632207691143-643e2c7a9a36?w=600" },
  { id: 3, name: "Golden Pothos", price: 15, category: "Easy Care", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600" },
  { id: 4, name: "Jade Plant", price: 16, category: "Easy Care", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600" },
  { id: 5, name: "Rubber Plant", price: 25, category: "Easy Care", image: "https://images.unsplash.com/photo-1614594895304-fe7116ac3b58?w=600" },
  { id: 6, name: "Peace Lily", price: 20, category: "Easy Care", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=600" },

  { id: 7, name: "Monstera", price: 30, category: "Statement Plants", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600" },
  { id: 8, name: "Bird of Paradise", price: 38, category: "Statement Plants", image: "https://images.unsplash.com/photo-1597055181300-a8e9e8e6d5d4?w=600" },
  { id: 9, name: "Fiddle Leaf Fig", price: 35, category: "Statement Plants", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600" },
  { id: 10, name: "Areca Palm", price: 28, category: "Statement Plants", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=600" },
  { id: 11, name: "Dracaena", price: 24, category: "Statement Plants", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600" },
  { id: 12, name: "Calathea", price: 26, category: "Statement Plants", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600" },

  { id: 13, name: "Aloe Vera", price: 12, category: "Succulents & Cacti", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600" },
  { id: 14, name: "Echeveria", price: 10, category: "Succulents & Cacti", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600" },
  { id: 15, name: "Haworthia", price: 11, category: "Succulents & Cacti", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600" },
  { id: 16, name: "Bunny Ear Cactus", price: 14, category: "Succulents & Cacti", image: "https://images.unsplash.com/photo-1463154545680-d59320fd685d?w=600" },
  { id: 17, name: "Burro's Tail", price: 13, category: "Succulents & Cacti", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600" },
  { id: 18, name: "String of Pearls", price: 17, category: "Succulents & Cacti", image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=600" },
];

export default function ProductList({ totalItems, onHomeClick, onCartClick }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const categories = [...new Set(plants.map((plant) => plant.category))];

  return (
    <div className="shop-page">
      <nav className="navbar">
        <button className="brand" onClick={onHomeClick}>Paradise Nursery</button>
        <div className="nav-links">
          <button onClick={onHomeClick}>Home</button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Plants</button>
          <button onClick={onCartClick}>Cart 🛒 ({totalItems})</button>
        </div>
      </nav>

      <header className="shop-heading">
        <p className="eyebrow">GROW SOMETHING GOOD</p>
        <h1>Find your perfect plant</h1>
        <p>Thoughtfully selected greens to brighten your space.</p>
      </header>

      {categories.map((category) => (
        <section className="plant-category" key={category}>
          <h2>{category}</h2>
          <div className="plant-grid">
            {plants.filter((plant) => plant.category === category).map((plant) => {
              const inCart = cart.some((item) => item.id === plant.id);

              return (
                <article className="plant-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} />
                  <div className="plant-card-content">
                    <h3>{plant.name}</h3>
                    <p className="plant-price">${plant.price.toFixed(2)}</p>
                    <button
                      className="primary-button add-button"
                      disabled={inCart}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {inCart ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}