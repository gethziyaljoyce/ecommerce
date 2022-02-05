import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
margin:20px;`;
const FilterContainer = styled.div`
display:flex;
justify-content:space-between;
`;
const Filter = styled.div`
margin:20px;
${mobile({margin:"0px 20px", display:"flex", flexDirection:"column"})} 
`;
const Filtertext = styled.span`
font-size:20px;
font-weight:600;
margin-right:20px;
${mobile({marginRight:"0px"})} 
`;

const Select = styled.select`
padding:10px;
margin-right:20px;
${mobile({margin:"10px 0px"})} 
`;
const Option = styled.option``;

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters,setFilters] = useState({});
    const [sort,setSort] = useState("newest");

    //to handle the filter
    const handleFilters = (event) => {
        const value = event.target.value;
        setFilters({...filters,[event.target.name]: value,});
    };

    // console.log(filters);
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter><Filtertext>Filter Products:</Filtertext>
                <Select name="color" onChange= {handleFilters}>
                    <Option disabled >Color</Option>
                    <Option>white</Option>
                    <Option>black</Option>
                    <Option>red</Option>
                    <Option>blue</Option>
                    <Option>yellow</Option>
                    <Option>gray</Option>
                </Select>
                <Select name="size" onChange= {handleFilters}>
                    <Option disabled >Size</Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                    <Option>XXL</Option>
                </Select>
                </Filter>
                <Filter><Filtertext>Sort Products:</Filtertext>
                <Select onChange={(event) => setSort(event.target.value)}>
                    <Option value="newest">Newest</Option>
                    <Option value="asc">Price (Asc)</Option>
                    <Option value="desc">Price (Desc)</Option>
                </Select>
                </Filter>

            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort}/>
            <Newsletter/>
            <Footer/>
        </Container>
    );
}

export default ProductList;