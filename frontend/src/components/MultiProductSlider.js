import React, { useEffect } from "react"
import {ListGroup, Row, Col, Card} from 'react-bootstrap'
import Rating from './Ratings'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {listTopProducts} from '../actions/productActions'



function MultiProductSlider () {
    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
    const { products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])


    return (
      <div className="prod-slider">
        <ListGroup as="ul" horizontal flush className="prod-slider-wrapper">

            {products.map(product => (
            <ListGroup.Item key={product._id} className="prod-slider-card"> 
                <Card className="flex-fill">
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
                            <div className="my-2">
                                <Rating value={product.rating} text={`${product.num_reviews} reviews`} color={'#f8e825'}/>
                            </div>
                        </Card.Text>
                        <Card.Text>
                            <Row>
                                {product.price === product.sale_price ? <Col as='h3'>${product.price}</Col> : <Col className='h3 sale-price-text'>${product.sale_price}<p className='h6'>ON SALE!</p></Col>}
                                <Col as='div' className = 'text-center'>
                                    <Link to={`/product/${product._id}`} className='btn-prod-details'>View Details</Link>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </ListGroup.Item>
            ))} 

        </ListGroup>
      </div>
    )
}

export default MultiProductSlider