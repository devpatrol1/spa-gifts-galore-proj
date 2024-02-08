import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, Link} from 'react-router-dom' 
import {Container, Row, Col, Image, Dropdown} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {listProductsByCategory} from '../actions/productActions'


function ShopView() {
	const dispatch = useDispatch()
	const location = useLocation()

	const [value, setValue] = useState('')
    const handleSelect=(e)=>{ setValue(e) }	

	const productByCategory = useSelector(state => state.productByCategory)
	const { error, loading, products, page, pages } = productByCategory
	const category = location.search

	const productType = 'productsByCategory'
	const substr = 'category=&page'

	useEffect(() => {
		dispatch(listProductsByCategory(category))
	}, [dispatch, category])


	return (
		<div>
			<Container className='shop-banner-bkgrnd my-3' style={{backgroundImage: `url("../static/images/bkgrnd1.png")`, backgroundSize: 'cover'}}>
				<Row as='div' className='align-items-center py-3'>
					<Col as='div' xs={12} sm={12} md={4} lg={3} className='text-center'>
						{ (!value && !category) || (!value && category.includes(substr)) ? <Image fluid className='shop-img' src={'/static/images/gift-shop-img.png'} /> : 
							category && !category.includes(substr) ? <CategoryImg value={decodeURI(category.split('?category=')[1].split('&')[0])}/> : <CategoryImg value={value}/> }
					</Col>
					<Col as='div' className='text-center my-2 mb-0' xs={12} sm={12} md={8} lg={9}>
						{ (!value && !category) || (!value && category.includes(substr)) ? <span className='shop-banner-text'>Start Your Shopping Journey</span> : 
							category && !category.includes(substr) ? <span className='shop-banner-text'>{decodeURI(category.split('?category=')[1].split('&')[0])}</span> : <span className='shop-banner-text'>{value}</span> }
						<Dropdown onSelect={handleSelect} className='shop-drpdwn'>
							<Dropdown.Toggle id="product-categories" variant="custom" className='shop-toggle'>
								Choose a category
							</Dropdown.Toggle>
							<Dropdown.Menu >
								<Dropdown.Item eventKey="Start Your Shopping Journey" as={Link} to="/shop">All Products</Dropdown.Item>
								<Dropdown.Item eventKey="Facial Skin Care" as={Link} to="/shop/?category=Facial Skin Care&page=1">Facial Skin Care</Dropdown.Item>
								<Dropdown.Item eventKey="Body Oils and Lotions" as={Link} to="/shop/?category=Body Oils and Lotions&page=1">Body Oils & Lotions</Dropdown.Item>
								<Dropdown.Item eventKey="Bath and Shower" as={Link} to="/shop/?category=Bath and Shower&page=1">Bath & Shower</Dropdown.Item>
								<Dropdown.Item eventKey="Body Fragrances" as={Link} to="/shop/?category=Body Fragrances&page=1">Body Fragrances</Dropdown.Item>
								<Dropdown.Item eventKey="Candles and Home Fragrances" as={Link} to="/shop/?category=Candles and Home Fragrances&page=1">Candles & Home Fragrances</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Col>
				</Row>
			</Container>

			<Row>
                <Col>
					{ (!value  && !category) || (value == 'Start Your Shopping Journey') || (!value && category.includes(substr)) ? <h1 className='shop-header'>Our Spa Gift Shop</h1> : 
						category && !category.includes(substr) ? <h1 className='shop-header'>Our {decodeURI(category.split('?category=')[1].split('&')[0])} Gift Shop</h1> : <h1 className='shop-header'>Our {value} Gift Shop</h1> }
				</Col>
            </Row>

			{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
			<div>
				<Row>
					{products.map(product => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} /> 
					</Col>
					))}
				</Row>
				<Paginate page={page} pages={pages} category={category} productType={productType} />
			</div>
			}
		</div>
	)
}

function CategoryImg({value}) {
    if (value.toString() == 'Facial Skin Care') {
		return <Image fluid className='shop-img' src={'/static/images/facial-skin-care-img.png'} />;
	  } else if (value.toString()=='Body Oils and Lotions') {
		return <Image fluid className='shop-img' src={'/static/images/body-oil&lotion-img.png'} />;
	  } else if (value.toString()=='Bath and Shower') {
		return <Image fluid className='shop-img' src={'/static/images/bath&shower-img.png'} />;
	  } else if (value.toString()=='Body Fragrances') {
		return <Image fluid className='shop-img' src={'/static/images/body-fragrance-img.png'} />;
	  } else if (value.toString()=='Candles and Home Fragrances') {
		return <Image fluid className='shop-img' src={'/static/images/candles&home-fragrances-img.png'} />;
	  } else {
		return <Image fluid className='shop-img' src={'/static/images/gift-shop-img.png'} />;
	  }
}

export default ShopView