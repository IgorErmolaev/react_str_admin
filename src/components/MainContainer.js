import React, {useEffect} from "react";
import Header from "./Header";
import Link from "./Link";
import CodeManage from "./CodeManage";
import { useDispatch, useSelector } from "react-redux";
import {Routes, Route} from 'react-router-dom';
import {fetchAuthCheck} from "../redux/authSlice";
import Loading from "./Loading";
import {Container} from "react-bootstrap";
import Home from "./Home";


function MainContainer() {

    const {status} = useSelector(state => state.authState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuthCheck());
    },[]);

    if (status === 'loading') return(
        <Container>
            <Loading/>
        </Container>
    ); else if (status === 'loading' || status === null) return(
        <Container>
            <Loading/>
        </Container>
    ); else
    return (

        <React.Fragment>
            <Header/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/codeManage" element={<CodeManage/>}/>
                    <Route path="/link" element={<Link/>}/>
                </Routes>
        </React.Fragment>
    );
}

export default MainContainer;
