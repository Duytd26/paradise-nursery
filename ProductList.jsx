import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [showCart, setShowCart] = useState(false);

    // Calculate total items in cart for the navbar icon
    const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores.", cost: "$18" },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air.", cost: "$20" },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for.", cost: "$17" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Soothing gel and purifying.", cost: "$14" }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ca66", description: "Calming scent.", cost: "$20" },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b", description: "Sweet fragrance.", cost: "$18" },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent.", cost: "$15" },
                { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/02/02/03/mint-1117565_1280.jpg", description: "Refreshing aroma.", cost: "$12" },
                { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/08/22/08/11/lemon-balm-4422967_1280.jpg", description: "Citrusy fragrance.", cost: "$14" },
                { name: "Oregano", image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790792_1280.jpg", description: "Earthy smell.", cost: "$10" }
            ]
        },
        {
            category: "Succulents",
            plants: [
                { name: "Cactus", image: "https://cdn.pixabay.com/photo/2014/08/24/00/01/cactus-426176_1280.jpg", description: "Drought tolerant.", cost: "$10" },
                { name: "Echeveria", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description: "Beautiful rosette shape.", cost: "$12" },
                { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2018/01/30/16/47/jade-plant-3119106_1280.jpg", description: "Symbol of good luck.", cost: "$15" },
                { name: "Haworthia", image: "https://cdn.pixabay.com/photo/2020/01/14/09/27/succulent-4764654_1280.jpg", description: "Striped leaves.", cost: "$14" },
                { name: "Zebra Plant", image: "https://cdn.pixabay.com/photo/2017/02/10/15/45/zebra-plant-2055416_1280.jpg", description: "Striking patterns.", cost: "$16" },
                { name: "Burro's Tail", image: "https://cdn.pixabay.com/photo/2018/06/07/07/26/plant-3459424_1280.jpg", description: "Trailing succulent.", cost: "$18" }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    const isAddedToCart = (plantName) => {
        return cartItems.some(item => item.name === plantName);
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-logo" onClick={() => setShowCart(false)} style={{cursor: 'pointer'}}>
                    <h3>Paradise Nursery</h3>
                </div>
                <div className="navbar-links">
                    <button className="nav-btn" onClick={() => setShowCart(false)}>Plants</button>
                    <button className="nav-btn cart-btn" onClick={() => setShowCart(true)}>
                        Cart
                        <span className="cart-count">{totalCartItems}</span>
                    </button>
                </div>
            </nav>

            {/* Content Area */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index} className="category-section">
                            <h2>{category.category}</h2>
                            <div className="plant-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div key={plantIndex} className="plant-card">
                                        <img src={plant.image} alt={plant.name} className="plant-image" />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p className="plant-cost">{plant.cost}</p>
                                        <button 
                                            className={`add-to-cart-btn ${isAddedToCart(plant.name) ? 'added' : ''}`}
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={isAddedToCart(plant.name)}
                                        >
                                            {isAddedToCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
