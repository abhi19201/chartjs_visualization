import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMeasures } from "./Actions/apiCall";
import ChartLayout from "./Components/Chart/ChartLayout";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Footer from "./Components/Footer/Footer";
import "./App.css";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMeasures());
    }, [dispatch]);

    return (
        <div className='App'>
            <Header />
            <ChartLayout />
            <Sidebar />
            <Footer />
        </div>
    );
}

export default App;
