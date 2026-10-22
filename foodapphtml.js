import React, { useState } from 'react';

// Mock Data: Restaurant & Menu
const restaurantData = {
  name: "Spicy Bites Indian Cuisine",
  rating: 4.8,
  deliveryTime: "30-45 min",
  menu: [
    { id: 1, name: "Chicken Tikka Masala", price: 14.99, description: "Creamy tomato curry with tender chicken." },
    { id: 2, name: "Garlic Naan", price: 3.99, description: "Freshly baked flatbread with garlic and herbs." },
    { id: 3, name: "Vegetable Biryani", price: 12.99, description: "Aromatic basmati rice cooked with mixed vegetables and spices." },
    { id: 4, name: "Mango Lassi", price: 4.50, description: "Refreshing yogurt-based mango drink." }
  ]
};

export default function FoodDeliveryApp() {
  const [cart, setCart] = useState([]);

  // Function to add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Function to calculate total price
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {/* Restaurant Header */}
      <header style={{ borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1 style={{ margin: '0 0 10px 0' }}>{restaurantData.name}</h1>
        <p style={{ color: '#666', margin: 0 }}>
          ⭐ {restaurantData.rating} | ⏱️ {restaurantData.deliveryTime}
        </p>
      </header>

      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Menu Section */}
        <div style={{ flex: 2 }}>
          <h2>Menu</h2>
          {restaurantData.menu.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                  <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>{item.description}</p>
                  <strong>${item.price.toFixed(2)}</strong>
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  style={{ padding: '10px 20px', backgroundColor: '#ff4500', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <div style={{ flex: 1 }}>
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', position: 'sticky', top: '20px' }}>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cart.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ marginTop: '20px', paddingTop: '10px', borderTop: '2px solid #ddd' }}>
                  <h3 style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Total:</span>
                    <span>${getCartTotal()}</span>
                  </h3>
                  <button style={{ width: '100%', padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}