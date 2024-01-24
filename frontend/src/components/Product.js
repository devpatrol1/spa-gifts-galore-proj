import React from 'react'
import {Card, Row, Col} from 'react-bootstrap'
import Rating from './Ratings'
import {Link} from 'react-router-dom'


function Product({product}) {
  return (
    <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image}/>
        </Link>
        <Card.Body>
            <a href={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </a> 
            <Card.Text as="div">
                <div className="my-3">
                    <Rating value={product.rating} text={`${product.num_reviews} reviews`} color={'#f8e825'}/>
                </div>
            </Card.Text>
            <Card.Text>
                <Row>
                    <Col as='h3'>
                        ${product.price}
                    </Col>
                    <Col as='div' className = 'text-center'>
                        <Link to={`/product/${product._id}`} className='btn-prod-details'><i className='fas fa-info-circle'></i> More Info</Link>
                    </Col>
                </Row>
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product