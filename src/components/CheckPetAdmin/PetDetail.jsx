import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import petApi from '#/api/petApi';
import '#/assets/scss/PetDatail.scss';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
export default function PetDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  console.log(data);
  useEffect(() => {
    petApi.getOne(id).then((ok) => {
      setData(ok);
    });
  }, []);
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/CheckPet">Kiểm tra thú cưng</BreadcrumbsItem>
      <BreadcrumbsItem to={`/admin/CheckPet/${id}`}>{data?.name + ' : ' + id}</BreadcrumbsItem>
      <div className="PetDetail">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Chi tiết thú cưng</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <div className="content">
          <div className="avatar">
            <div className="title">Ảnh đại diện</div>
            <img src={data?.avatar} alt="" />
          </div>
          <div className="list-avatar">
            <div className="title">Ảnh liên quan</div>
            {data?.imgpet?.map((oki) => (
              <img src={oki.link} alt="" />
            ))}
          </div>
          <div className="price">
            <div className="title">Giá</div>
            {data?.price}
          </div>
          <div className="description">
            <div className="title">mô tả</div>
            {data?.description}
          </div>
          <div className="text">
            <div className="title">Chi tiết</div>
            <div dangerouslySetInnerHTML={{ __html: data ? data?.text : '' }} />
            {/* {renderHTML(data ? data?.text : '')} */}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
