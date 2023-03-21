import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import billApi from '#/api/billApi';
import Spinner from '../Spin/Spinner';
import '#/assets/scss//BillDetail.scss';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
export default function BillDetail() {
  const { id } = useParams();

  const [data, setdata] = useState(null);
  const [bill, setBill] = useState(null);
  // console.log({ bill: bill, data: data });
  useEffect(() => {
    billApi
      .getOne(id)
      .then((ok) => {
        setdata(JSON.parse(ok.listProduct));
        setBill(ok);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
                <div className="phone">Khách hàng: {bill.userName}</div>
                <div className="phone">Tổng tiền hóa đơn: {Number(bill.price).toLocaleString()} vnđ</div>
                <div className="phone">Số điện thoại: {bill.phone}</div>
                <div className="phone">Địa chỉ: {bill.address}</div>
              </div>
              <h4 className="text-center" style={{ textAlign: 'center' }}>
                Chi tiết sản phẩm
              </h4>
              {data.map((ok) => (
                <div className="box" key={ok.id}>
                  <div className="box-img">
                    <img src={ok.avatar} alt="" />
                  </div>
                  <div className="box-content">
                    <div className="title">{ok.name}</div>
                    <div className="price">Giá: {Number(ok.price).toLocaleString()} vnđ</div>
                    <div className="quantity">Số lượng mua: {ok.quantityCurrent}</div>
                    <div className="result">Tổng tiền: {Number(ok.priceResult).toLocaleString()} vnđ</div>
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
