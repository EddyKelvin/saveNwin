//styles 
import './index.css'

//modules and packages
import React from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'

//media 
import logo from '../../Assets/images/logo.png'

const AuthHeader = () => (
        <div className='auth-header'> 
            <Container>
                <div className='header'>
                    <Link to='/'>
                        <img src={logo} alt='logo' />
                    </Link>
                </div>
                <Link to='/' className='return'>Return to Homepage</Link>
            </Container>
        </div>
    )


export default AuthHeader
