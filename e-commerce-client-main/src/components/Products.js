import { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
padding:20px;
display:flex;
flex-wrap:wrap;
justify-content:space-between;
`;

const Products = ({ cat, filters, sort }) => {
    // console.log(cat,filters,sort);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    //To load the products based on the category
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(cat ? `https://joyce-e-shopping.herokuapp.com/api/products?category=${cat}` : "https://joyce-e-shopping.herokuapp.com/api/products");
                // console.log(res);
                setProducts(res.data);
            } catch (err) {

            }
        };
        getProducts();
    }, [cat]);

    //To filter the products based on the color and size
    useEffect(() => {
        cat && setFilteredProducts(
            products.filter(item => Object.entries(filters).every(([key, value]) => item[key].includes(value)))
        );
    }, [cat, filters, products]);

    //To sort the products
    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt))
        } else if (sort === "asc") {
            setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
        } else {
            setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
        }
    }, [sort]);

    return (
        <Container>
            {cat ? filteredProducts.map((item) =>
        <Product key={item._id} item={item}  />
      ) : products.slice(0,6).map((item) =>
        <Product key={item._id} item={item}  />
      )}
        </Container>
    );
}

export default Products;
