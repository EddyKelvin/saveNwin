//styles
import './index.css'

//modules and packages
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

//media
import logo from '../../Assets/images/logo.png'

const Footer = () => (
    <div className='footer'>
        <Container>
            <Row>
                <Col md='4'>
                <Col md='6'>
                    <Link to='/'>
                        <img src={logo} className='logo' alt='logo' />
                    </Link>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad officiis rerum expedita maiores nulla.
                    </p>
                </Col>
                </Col>
                <Col md='8'>
                    <Row>
                        <Col md='4'>
                            <p className="title">My Account</p>
                            <ul>
                                <li>
                                    <Link className='footer-links' to='#'>My account</Link>
                                </li>
                                <li>
                                    <Link className='footer-links' to='#'>My account</Link>
                                </li>
                                <li>
                                    <Link className='footer-links' to='#'>My account</Link>
                                </li>
                                <li>
                                    <Link className='footer-links' to='#'>My account</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col md='4'>
                        <p className="title">My Account</p>
                            <ul>
                                <li>
                                    <Link className='footer-links' to='#'>My account</Link>
                                </li>
                                <li>
                                    <Link className='footer-links' to='#'>My account</Link>
                                </li>
                                <li>
                                    <Link className='footer-links' to='#'>My account</Link>
                                </li>
                                <li>
                                    <Link className='footer-links' to='#'>My account</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col md='4'>
                            <p className="title">Services provided</p>
                            <ul>
                                <li>
                                    <Link className='footer-links' to='#'>Web | App Dev</Link>
                                </li>
                                <li>
                                    <Link className='footer-links' to='#'>SEO | SMM</Link>
                                </li>
                                <li>
                                    <Link className='footer-links' to='#'>Domains | Hosting</Link>
                                </li>
                                <li>
                                    <Link className='footer-links' to='#'>Video | Digital Maketing</Link>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <p>&copy; SaveNWin- All Rights Reserved</p>
        </Container>
    </div>
)


export default Footer