import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";;
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setsearch] = useState("");
  const [showsearch, setshowsearch] = useState(false);
  const [cartitems, setcartitems] = useState({});
  const [products, setproducts] = useState([]);
  const [token, settoken] = useState("");
  const [user, setuser] = useState(null); // Store user info

  const navigate = useNavigate();

  const addtocart = async (itemId, size) => {
  if (!token) {
    toast.error("Please login to add items to cart");
    navigate("/login"); 
    return;
  }

  if (!size) {
    toast.error("Please Select Product Size");
    return;
  }

  const cartdata = structuredClone(cartitems);

  if (cartdata[itemId]) {
    if (cartdata[itemId][size]) {
      cartdata[itemId][size] += 1;
    } else {
      cartdata[itemId][size] = 1;
    }
  } else {
    cartdata[itemId] = { [size]: 1 };
  }

  setcartitems(cartdata);
  toast.success("Item added to cart");

  try {
    await axios.post(backendUrl + "/api/cart/add", { itemId, size }, {
      headers: { token },
    });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};


  const getcartcount = () => {
    let totalcount = 0;
    for (const itemId in cartitems) {
      for (const size in cartitems[itemId]) {
        const quantity = cartitems[itemId][size];
        if (quantity > 0) {
          totalcount += quantity;
        }
      }
    }
    return totalcount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartdata = structuredClone(cartitems);
    cartdata[itemId][size] = quantity;
    setcartitems(cartdata);

    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity }, { headers: { token } });
        toast.success("Cart updated successfully");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getcartamount = () => {
    let totalamount = 0;
    for (const items in cartitems) {
      const iteminfo = products.find((product) => product._id === items);
      for (const item in cartitems[items]) {
        try {
          if (cartitems[items][item] > 0) {
            totalamount += iteminfo.price * cartitems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalamount;
  };

  const getproductsdata = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setproducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(error.message);
    }
  };

  const getusercart = async (token) => {
    try {
      const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { token } });
      if (response.data.success) {
        setcartitems(response.data.cartdata || {});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getuserinfo = async (token) => {
    try {
      const res = await fetch(backendUrl + "/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setuser(data.user);
      } else {
        console.log("User info fetch failed", data.msg);
      }
    } catch (error) {
      console.log("Error fetching user info", error.message);
    }
  };

  // Load products once
  useEffect(() => {
    getproductsdata();
  }, []);

  // Handle token on first mount
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!token && localToken) {
      settoken(localToken);
      getusercart(localToken);
      getuserinfo(localToken);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setsearch,
    showsearch,
    setshowsearch,
    cartitems,
    setcartitems,
    addtocart,
    getcartcount,
    updateQuantity,
    getcartamount,
    navigate,
    backendUrl,
    token,
    settoken,
    user,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
