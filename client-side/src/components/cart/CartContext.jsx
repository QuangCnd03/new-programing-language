import { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [couponStorage, setCouponStorage] = useState(null);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const coupon = JSON.parse(localStorage.getItem('coupon'));
    setCartItems(items);
    setCartCount(items.length);
    setCouponStorage(coupon);
  }, []);
  const addToCart = (course) => {
    if(!course.code) {
      return false;
    }
    const existingItem = cartItems.find(item => item.code === course.code);
    
    if (existingItem) {
      Swal.fire({
        title: "Product already in cart",
        text: "This course is already in your cart",
        icon: "warning",
        confirmButtonColor: "#3085d6"
      });
      return false;
    }

    const courseItem = {
      id: course.id,
      code: course.code,
      name: course.name,
      thumbnail: course.thumbnail,
      price: course.sale_price > 0 ? course.sale_price : course.price,
    };

    const newCartItems = [...cartItems, courseItem];
    setCartItems(newCartItems);
    setCartCount(newCartItems.length);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    
    return true;
  };
  const addCoupon = (coupon) => {
    const existingCoupon = cartItems.find(item => item.coupon_code === coupon.coupon_code);
    if(existingCoupon) {
      return false;
    }
    const couponItem = {
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      coupon_code: coupon.coupon_code
    };
    setCouponStorage(couponItem);
    localStorage.setItem('coupon', JSON.stringify(couponItem));

  };
  const removeCoupon = () => {
    localStorage.removeItem('coupon');
  };
  const clearAllItems = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem('cartItems');
  };

  const clearItem = (code) => {
    const newCartItems = cartItems.filter(item => item.code !== code);
    setCartItems(newCartItems);
    setCartCount(newCartItems.length);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const calculateTotal = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + price;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, couponStorage, addToCart, clearAllItems, 
      clearItem, calculateTotal, addCoupon, removeCoupon }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 