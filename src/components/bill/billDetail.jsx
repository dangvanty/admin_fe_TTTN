import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import billApi from '#/api/billApi';
import Spinner from '../Spin/Spinner';
import '#/assets/scss//BillDetail.scss';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
import { fCurrency } from '#/helper/formatNumber';
export default function BillDetail() {
  const { id } = useParams();

  const [data, setdata] = useState(null);
  const [bill, setBill] = useState(null);
  // console.log({ bill: bill, data: data });
  useEffect(() => {
    billApi
      .getOne(id)
      .then((ok) => {
        setBill(ok);
        const b = [];
        const c = [];
        ok.orderdetail.forEach((item) => {
          if (item.Pet !== null) {
            b.push({
              petId: item.petId,
              quantity: item.quantity_pet,
              unit_price: item.unit_price_pet,
              price: item.price,
              name: item.Pet.name,
              avatar: item.Pet.avatar,
            });
          } else {
            c.push({
              productId: item.productId,
              quantity: item.quantity_product,
              unit_price: item.unit_price_product,
              price: item.price,
              name: item.Product.name,
              avatar: item.Product.avatar,
            });
          }
        });

        setdata([...b, ...c]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  console.log('datane::::', data);
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Bill">Hóa đơn</BreadcrumbsItem>
      <BreadcrumbsItem to={`/admin/Bill/BillDetail:${id}`}>Chi tiết hóa đơn : {id}</BreadcrumbsItem>
      <div className="AdminTable">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Chi tiết Hoá đơn</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <div className="bill-detail">
          {data && bill ? (
            <div className="container">
              <div className="box-content">
                <div className="phone">ID User: {bill?.userId}</div>
                <div className="phone">Tên Khách hàng: {bill?.User.firstName + ' ' + bill?.User.lastName}</div>
                <div className="phone">Tổng tiền hóa đơn: {fCurrency(bill?.total_price)} vnđ</div>
                <div className="phone">Số điện thoại: {bill?.phone}</div>
                <div className="phone">Địa chỉ: {bill?.address}</div>
                <div className="phone">Ghi chú: {bill?.note}</div>
              </div>
              <h4 className="text-center" style={{ textAlign: 'center' }}>
                Chi tiết sản phẩm
              </h4>
              {data.map((ok) => (
                <div className="box" key={ok.id}>
                  <div className="box-img">
                    <img src={ok?.avatar} alt="" />
                  </div>
                  <div className="box-content">
                    <div className="title">{ok?.name}</div>
                    <div className="price">Đơn giá: {fCurrency(ok?.unit_price)} vnđ</div>
                    <div className="quantity">Số lượng mua: {ok?.quantity}</div>
                    <div className="result">Tổng tiền: {fCurrency(ok?.price)} vnđ</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
