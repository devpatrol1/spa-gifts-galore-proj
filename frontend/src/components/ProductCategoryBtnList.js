import React from 'react'
import {Container, Row, Col, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'



function ProductCategoryBtnList() {
    return (
        <Container className='prod-categories my-3'>
        <Row xs={2} sm={2} md={5} lg={5}> 
            <Col> 
                <Link to={'/shop/?category=Bath and Shower&page=1'}>
                    <Image src={'/static/images/bath&shower-img.png'} fluid/>
                </Link>
                <div className='text-center my-2'><h6 className='pb-2'>Bath & Shower</h6></div>
            </Col> 
            <Col> 
                <Link to={'/shop/?category=Body Fragrances&page=1'}>
                    <Image src={'/static/images/body-fragrance-img.png'} fluid/>
                </Link>
                <div className='text-center my-2'><h6 className='pb-2'>Body Fragrances</h6></div>
            </Col> 
            <Col> 
                <Link to={'/shop/?category=Body Oils and Lotions&page=1'}>
                    <Image src={'/static/images/body-oil&lotion-img.png'} fluid/>
                </Link>
                <div className='text-center my-2'><h6 className='pb-2'>Body Oils & Lotions</h6></div>
            </Col>
            <Col> 
                <Link to={'/shop/?category=Candles and Home Fragrances&page=1'}>
                    <Image src={'/static/images/candles&home-fragrances-img.png'} fluid/>
                </Link>
                <div className='text-center my-2'><h6 className='pb-2'>Candles & Home Fragrances</h6></div>
            </Col>
            <Col> 
                <Link to={'/shop/?category=Facial Skin Care&page=1'}>
                    <Image src={'/static/images/facial-skin-care-img.png'} fluid/>
                </Link>
                <div className='text-center my-2'><h6 className='pb-2'>Facial Skin Care</h6></div>
            </Col> 
        </Row> 
      </Container>
    )
}

export default ProductCategoryBtnList