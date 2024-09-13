import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import './Login.css'
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { useNavigate } from "react-router-dom";
function Login() {
    // stato per gestire la visualizzazione dei form
    const [showForm, setShowForm] = useState(true)
    const {token} = useContext(LoginContext)
    const navigate = useNavigate()

    const redirectIfLoggedIn = function() {
        if(token) navigate('/')
    }
    
    useEffect(redirectIfLoggedIn,[token])

return ( 
        <Row className="loginWrapper">
            <Col xs={12} md={12} lg={9}>
                {showForm && <LoginForm showForm={showForm} setShowForm={setShowForm}/>}
                {!showForm && <RegisterForm showForm={showForm} setShowForm={setShowForm}/>}
            </Col>
            <Col lg={3} className="d-none d-sm-none d-md-none d-lg-block">
                <div className="loginImageWrapper">
                    <img alt="Ti diamo il benvenuto nella tua community professionale" src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"></img>
                </div>
            </Col>
        </Row>
    );
}

export default Login
;