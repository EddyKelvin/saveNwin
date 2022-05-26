//styles
import './index.css'

//modules and packages
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import SearchForm from './SearchForm'


const Hero = () => {
    return (
        <div className='hero'>
            <Container>
                <Row>
                    <Col md='6' className='hero-text-container'>
                        <h1>Win VIP contests and gift cards on SaveNwin</h1>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                        </p>
                    </Col>
                </Row>
                <SearchForm />
            </Container>            
        </div>
    )
}

export default Hero
