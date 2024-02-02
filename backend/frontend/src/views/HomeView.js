import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useLocation} from 'react-router-dom' 
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {listProducts} from '../actions/productActions'
import PromoCarousel from '../components/PromoCarousel'
import ProductCategoryBtnList from '../components/ProductCategoryBtnList'
import MultiProductSlider from '../components/MultiProductSlider'


function HomeView() {
	const dispatch = useDispatch()
	const location = useLocation()
	const productList = useSelector(state => state.productList)
	const { error, loading, products, page, pages } = productList
	const keyword = location.search

	const productType = 'productsOnly'
	const substr = 'keyword=&page'

	useEffect(() => {
		dispatch(listProducts(keyword))
	}, [dispatch, keyword])

	return (
		<div>
			{!keyword || keyword.includes(substr) ? ( 
			<div>			
				<PromoCarousel />

				<h2 className='home-header'>Shop By Category</h2>
				<ProductCategoryBtnList />
			</div>
			) : (
			<div>
				<Row as='div'>
					<Col><h1 className='home-header'>Search Results</h1></Col>
					<Col>
						<div className='text-end'>
							<Link to={'/shop'} className='btn-page-nav my-5 mb-0'>Continue Shopping</Link>
						</div>
					</Col>
				</Row>	
			</div>
			)}

			{!keyword || keyword.includes(substr) ? ( 
			<div>
				{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
				<div className='my-3'>
					<h2 className='home-header'>Customer Top-Rated</h2>
					<MultiProductSlider />
				</div>
				}
			</div>
			) : (
			<div>
				{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
				<div> 
					<Row>
					{products.map(product => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product}/>
						</Col>
					))}
					</Row>
					<Paginate page={page} pages={pages} keyword={keyword} productType={productType} />
				</div>
				}
			</div>
			)}
		</div>
	)
}

export default HomeView