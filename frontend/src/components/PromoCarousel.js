import React from 'react'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'



function PromoCarousel() {
    return (
        <div className='custom-bkgrnd my-4 text-center' style={{backgroundImage: `url("../images/bkgrnd1.png")`, backgroundSize: 'cover'}}>
            <Carousel className='promo-carousel' pause='hover' >
                <Carousel.Item>
                    <Link to={'/shop/?category=Bath and Shower&page=1'}>
                        <Image src='/images/bath&shower_promo_img.png' alt='bath&shower_sale' />
                    </Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to={'/shop/?category=Body Oils and Lotions&page=1'}>
                        <Image src='/images/lotion&creams_promo_img.png' alt='lotion&cream_sale' />
                    </Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to={'/shop'}>
                        <Image src='/images/new_products_promo_img.png' alt='new_products' />
                    </Link>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default PromoCarousel
