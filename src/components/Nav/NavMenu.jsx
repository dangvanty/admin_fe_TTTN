import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useResolvedPath, useRouteMatch } from 'react-router-dom';
import '#/assets/scss/Nav.scss';
import {
  app,
  bills,
  category,
  contact,
  gallegy,
  logoAdmin,
  news,
  product,
  schedule,
  service,
  tag,
  twitter,
  useCheck,
  weight,
} from '#/assets/svg/IconSvg';
import { clickActive } from './NavJs';
import { userData } from '#/redux/Slices/UserSlice';

export default function NavMenu() {
  const ulEL = useRef(null);
  const lineEL = useRef(null);
  const user = useSelector((state) => state.user.user);
  // console.log('user:::::::::', user);
  const dispatch = useDispatch();
  useEffect(() => {
    const listLi = ulEL.current.querySelectorAll('li a');
    const listActive = ulEL.current.querySelector('li>a.active');
    // let pathCutAdmin = pathname.slice(7);
    let idClass = pathname.slice(7).split('/');
    // let indexPath = pathCutAdmin.indexOf("/");
    // let idClass = pathCutAdmin.slice(0, indexPath);
    listActive.classList.remove('active');
    let liIndex = 0;
    for (let i = 0; i < listLi.length; i++) {
      const element = listLi[i];
      if (element.id === idClass[0]) {
        liIndex = i;
        element.classList.add('active');
      }
    }
    clickActive(ulEL.current, lineEL.current, liIndex);
    dispatch(userData());
  }, []);
  const path = useResolvedPath('').pathname;
  const { pathname } = useLocation();
  return (
    <div className="nav-left ">
      <div className="heading-left">
        <div className="logo">
          <Link to="/admin">
            <img src="/logo.jpg" width={60} height={60} style={{ borderRadius: '50%' }} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="user">
        <div className="avatar">
          <img src={user?.avatar} alt="" />
        </div>
        <div className="content">
          <div className="title">Chức vụ</div>
          <div className="position">admin</div>
        </div>
      </div>
      <div className="content">
        <ul ref={ulEL}>
          <div className="line" ref={lineEL}></div>
          <li>
            <Link to="/admin" className="active" id="">
              <div className="icon">{app}</div>
              <div className="text">Thống kê</div>
            </Link>
          </li>
          <li>
            <Link to="/admin/CheckPet" id="CheckPet">
              <div className="icon">{useCheck}</div>
              <div className="text">Kiểm tra thú cưng</div>
            </Link>
          </li>
          <li>
            <Link to="/admin/Category" id="Category">
              <div className="icon">{category}</div>
              <div className="text">Danh mục sản phẩm</div>
            </Link>
          </li>
          <li>
            <Link to="/admin/Products" id="Products">
              <div className="icon">{product}</div>
              <div className="text">Sản phẩm</div>
            </Link>
          </li>
          <li>
            <Link to="/admin/New" id="New">
              <div className="icon">{news}</div>
              <div className="text">Tin tức</div>
            </Link>
          </li>
          <li>
            <Link to="/admin/Tag" id="Tag">
              <div className="icon">{tag}</div>
              <div className="text">Tag</div>
            </Link>
          </li>
          <li>
            <Link to="/admin/Bill" id="Bill">
              <div className="icon">{bills}</div>
              <div className="text">Hoá đơn</div>
            </Link>
          </li>
          <li>
            <Link to="/admin/Schedule" id="Schedule">
              <div className="icon">{schedule}</div>
              <div className="text">Đặt lịch</div>
            </Link>
          </li>
          <li>
            <Link to="/admin/Service" id="Service">
              <div className="icon">{service}</div>
              <div className="text">Dịch vụ</div>
            </Link>
          </li>
          <li>
            <Link to="/admin/Gallery" id="Gallery">
              <div className="icon">{gallegy}</div>
              <div className="text">Thư viện ảnh</div>
            </Link>
          </li>
          <li>
            <Link to="/admin/Weight" id="Weight">
              <div className="icon">{weight}</div>
              <div className="text">Cân nặng</div>
            </Link>
          </li>
          <li>
            <Link to="/admin/Contact" id="Contact">
              <div className="icon">{contact}</div>
              <div className="text">Liên hệ</div>
            </Link>
          </li>
          <li>
            <Link to="/admin/SocialNetwork" id="SocialNetwork">
              <div className="icon">{twitter}</div>
              <div className="text">Mạng xã hội</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
