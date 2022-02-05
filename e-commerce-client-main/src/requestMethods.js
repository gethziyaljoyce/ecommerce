import axios from "axios";

const BASE_URL = "https://joyce-e-shopping.herokuapp.com/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzc2YjE4MzliNzczMTgwZmUyZWM4NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MDQ2MzgwNCwiZXhwIjoxNjQwNzIzMDA0fQ.6Z8kgyQ0NcOWB1_QtORTqf9IvQzECdw90DVuZauUpSk";
export const publicRequest = axios.create({
    baseURL: BASE_URL,
  });
  
  export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
  });