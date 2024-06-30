import ProductCard from "../components/product-card.tsx"
import { Link } from 'react-router-dom'
import { useLatestProductsQuery } from "../redux/api/productAPI.ts"
import toast from "react-hot-toast";
import { Skeleton } from "../components/loader.tsx";
import { cartItem } from "../types/types.ts";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer.ts";

const Home = () => {

  const { data, isLoading, isError } = useLatestProductsQuery("");
  if(isError) 
    toast.error("Cannot fetch latest products!")

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: cartItem) => {
    if(cartItem.stock < 1) return toast.error("Out Of Stock!")
    toast.success("Added to cart!")
    dispatch(addToCart(cartItem))
  };
  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">More</Link>
      </h1>

      <main>
        {
          isLoading? <Skeleton width="80vw"/> : 
          data?.products.map((i) =>
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={`${import.meta.env.VITE_SERVER}/${i.photo}`}
            />
          )
        }
      </main>
    </div>
  )
}

export default Home