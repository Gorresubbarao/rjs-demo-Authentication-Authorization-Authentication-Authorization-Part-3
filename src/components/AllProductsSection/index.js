import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLodding: true,
  }
  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    console.log('jwtToken ==> in allProductsSection', jwtToken)
    const apiUrl = 'https://apis.ccbp.in/products'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    console.log('authorization ===>', options.headers.Authorization)
    const response = await fetch(apiUrl, options)
    console.log('response', response)

    if (response.ok === true) {
      const fetcheddata = await response.json()
      console.log('fetcheddata ===', fetcheddata)
      const udatedData = fetcheddata.products.map(eachProduct => ({
        barnd: eachProduct.barnd,
        id: eachProduct.id,
        imageUrl: eachProduct.image_url,
        price: eachProduct.price,
        rating: eachProduct.rating,
        title: eachProduct.title,
      }))
      this.setState({productsList: udatedData, isLodding: false})
    }
  }

  renderProductsList = () => {
    const {productsList, isLodding} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {isLodding ? (
            <div className="loader">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))
          )}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
