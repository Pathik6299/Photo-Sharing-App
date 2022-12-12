import {Route,Routes} from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Signup from '../pages/signup';

const Router = () =>{
    return(
        <>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/sign-up" element={<Signup/>} />
                <Route exact path="/home" element={<Home/>} />
            </Routes>
        </>
    );
}

export default Router;