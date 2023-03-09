import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CheckPetAdmin from './components/CheckPetAdmin/CheckPetAdmin';
import './App.css';
import PetDetail from './components/CheckPetAdmin/PetDetail';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import Category from './components/Category/Category';
import AddCategory from './components/Category/AddCategory';
import Statistical from './components/Statistical/Statistical';
import Product from './components/Product/Product';
import AddProduct from './components/Product/AddProduct';
import New from './components/New/New';
import AddNew from './components/New/AddNew';
import Tag from './components/Tag/Tag';
import AddTag from './components/Tag/AddTag';
import Bill from './components/bill/bill';
import BillDetail from './components/bill/billDetail';
import Schedule from './components/Schedule/Schedule';
import ScheduleDetail from './components/Schedule/DetailSchedule';
import Service from './components/Service/Service';
import AddService from './components/Service/AddService';
import Gallery from './components/Gallery/Gallery';
import AddGallery from './components/Gallery/AddGallery';
import Weight from './components/Weight/Weight';
import AddWeight from './components/Weight/AddWeight';
import Contact from './components/Contact/Contact';
import AddContact from './components/Contact/AddContact';
import SocialNetwork from './components/SocialNetwork/SocialNetwork';
import AddSocialNetwork from './components/SocialNetwork/AddSocialNetwork';
import Login from './components/Login/Login';
import ProtectedRoute from './helper/ProtectRouter';
import CheckLogin from './helper/CheckLogin';

function App() {
  return (
    <div>
      <BreadcrumbsProvider>
        <Routes>
          <Route element={<CheckLogin />}>
            <Route exact path="/" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route exact path="/admin" element={<Statistical />} />
            <Route path="/admin/CheckPet" element={<CheckPetAdmin />} />
            <Route path="/admin/CheckPet/PetDetail/:id" element={<PetDetail />} />
            <Route path="/admin/Category" element={<Category />} />
            <Route path="/admin/Category/AddCategory" element={<AddCategory />} />
            <Route path="/admin/Category/AddCategory/:id" element={<AddCategory />} />
            <Route path="/admin/Products" element={<Product />} />
            <Route path="/admin/Products/AddProduct" element={<AddProduct />} />
            <Route path="/admin/Products/AddProduct/:id" element={<AddProduct />} />
            <Route path="/admin/New" element={<New />} />
            <Route path="/admin/New/AddNew" element={<AddNew />} />
            <Route path="/admin/New/AddNew/:id" element={<AddNew />} />
            <Route path="/admin/Tag" element={<Tag />} />
            <Route path="/admin/Tag/AddTag" element={<AddTag />} />
            <Route path="/admin/Tag/AddTag/:id" element={<AddTag />} />
            <Route path="/admin/Bill" element={<Bill />} />
            <Route path="/admin/Bill/DetailBill/:id" element={<BillDetail />} />
            <Route path="/admin/Schedule" element={<Schedule />} />
            <Route path="/admin/Schedule/ScheduleDetail/:id" element={<ScheduleDetail />} />
            <Route path="/admin/Service" element={<Service />} />
            <Route path="/admin/Service/AddService" element={<AddService />} />
            <Route path="/admin/Service/AddService/:id" element={<AddService />} />
            <Route path="/admin/Gallery" element={<Gallery />} />
            <Route path="/admin/Gallery/AddGallery" element={<AddGallery />} />
            <Route path="/admin/Gallery/AddGallery/:id" element={<AddGallery />} />
            <Route path="/admin/Weight" element={<Weight />} />
            <Route path="/admin/Weight/AddWeight" element={<AddWeight />} />
            <Route path="/admin/Weight/AddWeight/:id" element={<AddWeight />} />
            <Route path="/admin/Contact" element={<Contact />} />
            <Route path="/admin/Contact/AddContact" element={<AddContact />} />
            <Route path="/admin/Contact/AddContact/:id" element={<AddContact />} />
            <Route path="/admin/SocialNetwork" element={<SocialNetwork />} />
            <Route path="/admin/SocialNetwork/AddSocialNetwork/:id" element={<AddSocialNetwork />} />
            <Route path="/admin/SocialNetwork/AddSocialNetwork" element={<AddSocialNetwork />} />
          </Route>
        </Routes>
      </BreadcrumbsProvider>
    </div>
  );
}

export default App;
