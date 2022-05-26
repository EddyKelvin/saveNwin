import './index.css'

import React from 'react'
import { MoreOutlined } from '@ant-design/icons'
import { Popover } from 'antd'

const List = ({data, error, actions}) => {
    const { moreOptions, showOwnerDetails, showProductDetails } = actions

    return (
        <>
        <ul className='product-list'>
            <li className='item topper'>
                <p className="cell no">No</p>
                <p className="cell title">Product Title</p>
                <p className="cell cat">Category</p>
                <p className="cell sell">Seller Email</p>
                <p className="cell date">Date Created</p>
                <p className="cell amount">Amount</p>
                <p className="cell actions">Actions</p>
            </li>
            {
                error &&
                <li>{error}</li>
            }
            {
                data &&
                data.products.map((product, key) => (
                    <li className='item' key={key}>
                        <p className="cell no">{key}</p>
                        <p className="cell title" onClick={() => showProductDetails(product._id)}>{product.title}</p>
                        <p className="cell cat">{product.category}</p>
                        <p className="cell sell" onClick={() => showOwnerDetails(product.owner)}>{product.owner}</p>
                        <p className="cell date">{new Date(product.createdAt).toDateString()}</p>
                        <p className="cell amount">{product.sellingPrice - product.discount}</p>
                        <p className="cell actions" >
                            <Popover content={
                                <ul>
                                    {moreOptions.map((option, key) => (
                                        <li onClick={() => option.onClick(product._id)} key={key}>{option.title}</li>
                                    ))}
                                </ul>
                            } title='actions' trigger='click'>
                                <MoreOutlined />
                            </Popover>    
                        
                        </p>
                        
                    </li>
                ))
            }  
        </ul>
        </>
        
    )
}

export default List
 