import React from 'react'
import { Pagination, PageItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


function Paginate({ pages, page, keyword = '', category = '', isAdmin = false, itemsType = '', productType = '' }) {
    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    if (category) {
        category = category.split('?category=')[1].split('&')[0]
    }

    return (
        pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    to={{
                        search: (productType && productType === 'productsByCategory') ? `?category=${category}&page=${x + 1}` : `?keyword=${keyword}&page=${x + 1}`,
                        pathname: (!isAdmin && productType === 'productsOnly') ? '/' : 
                            (!isAdmin && productType === 'productsByCategory') ? '/shop/' :
                                    itemsType === 'product' ? '/admin/productlist/' : 
                                        itemsType === 'order' ? '/admin/orderlist/' : '/admin/userlist/'
                    }}
                >
                    <PageItem key={x + 1} linkClassName={`${ x + 1 === page ? "active page-item" : "page-item"}`}>{x + 1}</PageItem>
                </LinkContainer>
            ))}
        </Pagination>
    ))
}

export default Paginate