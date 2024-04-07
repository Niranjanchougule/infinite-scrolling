import { useEffect, useState } from "react";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState();

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?skip=${page * 10}&limit=10`
    );
    const data = await res.json();

    console.log(data);
    setProducts((prevProducts) => [...prevProducts, ...data.products]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchProducts();
    console.log("useEffect called");
  }, []);

  return (
    <div className="product-list">
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={total === page * 10 ? false : true}
        endMessage={"End of the list"}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.9}
      >
        {products.map((prod) => {
          return (
            <span className="product-box" key={prod.id}>
              <img src={prod.thumbnail} alt="product imag" />
              <span>{prod.title}</span>
            </span>
          );
        })}
      </InfiniteScroll>
      {/* {loading && <div>Loading...</div>} */}
    </div>
  );
}

export default App;
