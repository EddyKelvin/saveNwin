import React from 'react'
import { Modal, Container, Row, Col } from 'reactstrap'

const ProductModal = ({data, modal, toggle, error}) => {
    return (
        <Modal isOpen={modal} toggle={toggle} className='product-modal'>
            <Container>
                {
                    error &&
                    <p>{error}</p>
                }
                {
                    data &&
                    <Row>
                        <Col md='4' sm='12'>
                            <img className='product-img' src={data.avatar} alt={data.title} />
                        </Col>
                        <Col md='8' sm='12'>
                            <div className="product-info">
                                <h4>{data.title}</h4>
                                <p>Price: <span className='price'>${data.sellingPrice - data.discount}</span> </p>
                                <p>Product category: {data.category}</p>
                                <p>Store location: {data.city}</p>
                                <p>Product details: <br /> {data.description}</p>
                            </div>
                        </Col>
                    </Row>
                }
                
            </Container>
        </Modal>
    )
}

export default ProductModal
