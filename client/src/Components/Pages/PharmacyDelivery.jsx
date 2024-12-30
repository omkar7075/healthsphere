import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/PharmacyDelivery.css";

const PharmacyDelivery = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [medicines, setMedicines] = useState([]); // Ensure medicines is initialized as an array
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pharmacy");
        // Validate the response data to ensure it's an array
        if (Array.isArray(response.data)) {
          setMedicines(response.data);
        } else {
          throw new Error("Invalid data format received from the server.");
        }
      } catch (err) {
        console.error("Error fetching medicines:", err.message);
        setErrorMessage("Failed to fetch medicines.");
      }
    };

    fetchMedicines();
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const addToCart = (medicine) => {
    if (!cart.find((item) => item._id === medicine._id)) {
      setCart((prev) => [...prev, medicine]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="pharmacy-container">
      <h1 className="page-title">Pharmacy & Medicine Delivery</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for medicines..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="medicine-list">
        {medicines
          .filter((medicine) =>
            medicine.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((medicine) => (
            <div key={medicine._id} className="medicine-card">
              <h3>{medicine.name}</h3>
              <p>₹{medicine.price}</p>
              <button onClick={() => addToCart(medicine)}>Add to Cart</button>
            </div>
          ))}
      </div>
      <div className="cart-section">
        <h2>Your Cart</h2>
        {cart.length > 0 ? (
          <div>
            <ul>
              {cart.map((item) => (
                <li key={item._id}>
                  {item.name} - ₹{item.price}
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p className="total-price">Total: ₹{totalPrice}</p>
            <button className="checkout-button">Checkout</button>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default PharmacyDelivery;
