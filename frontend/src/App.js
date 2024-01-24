import {Container} from 'react-bootstrap'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import HomeView from './views/HomeView'
import ShopView from './views/ShopView'
import ProductView from './views/ProductView'
import CartView from './views/CartView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ProfileView from './views/ProfileView'
import ShippingView from './views/ShippingView'
import PaymentView from './views/PaymentView'
import PlaceOrderView from './views/PlaceOrderView'
import OrderView from './views/OrderView'
import UserListView from './views/UserListView'
import UserEditView from './views/UserEditView'
import ProductListView from './views/ProductListView'
import ProductEditView from './views/ProductEditView'
import OrderListView from './views/OrderListView'



function App() {
  return (
   <div>
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
            <Routes>

              <Route path='/' element={<HomeView/>} exact />
              <Route path='/shop' element={<ShopView/>}/>
              <Route path='/login' element={<LoginView/>}/>
              <Route path='/register' element={<RegisterView/>}/>
              <Route path='/profile' element={<ProfileView/>}/>
              <Route path='/shipping' element={<ShippingView/>}/>
              <Route path='/payment' element={<PaymentView/>}/>
              <Route path='/placeorder' element={<PlaceOrderView/>}/>
              <Route path='/order/:id' element={<OrderView/>}/>
              <Route path='/product/:id' element={<ProductView/>} />
              <Route path='/cart/:id?' element={<CartView/>} />
              
              <Route path='/admin/userlist' element={<UserListView/>}/>
              <Route path='/admin/user/:id/edit' element={<UserEditView/>}/>
              <Route path='/admin/productlist' element={<ProductListView/>} />
              <Route path='/admin/product/:id/edit' element={<ProductEditView/>} />
              <Route path='/admin/orderlist' element={<OrderListView/>} />

            </Routes>
        </Container>
      </main>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
