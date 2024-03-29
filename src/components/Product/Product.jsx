import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productApi from '#/api/productApi';
import { countPagination, formatDate } from '#/helper/sub-function';
import Spinner from '../Spin/Spinner';
import { add, statusOff, statusOn } from '#/assets/svg/IconSvg';
import Table from '../Table/Table';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
export default function Product() {
  const titleTable = [
    { title: 'Tên sản phẩm', name: 'name' },
    { title: 'Ảnh', name: 'img' },
    { title: 'Thời gian', name: 'time' },
    { title: 'action', name: 'action' },
  ];

  const [data, setdata] = useState(null);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    productApi
      .getAll({ page: page })
      .then((ok) => {
        setdata(ok.data);
        console.log('datane:::', ok.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load, page]);
  const onchangeDelete = async (e) => {
    await productApi.deleteproduct(e);
    setLoad(!load);
  };
  const onchangeStatus = (e, id) => {
    setdata(null);
    if (e === 0) {
      productApi.editproduct({ status: 1, id: id });
    } else {
      productApi.editproduct({ status: 0, id: id });
    }
    setTimeout(() => {
      setLoad(!load);
    }, 500);
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Products">Sản phẩm</BreadcrumbsItem>
      <div className="AdminTable">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Sản phẩm</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <div className="add-admin">
          <button>
            <Link to="/admin/Products/AddProduct">
              <div className="icon">{add}</div>
              <div className="text">Thêm sản phẩm</div>
            </Link>
          </button>
        </div>
        {data !== null ? (
          <div>
            <Table
              titleTable={titleTable}
              onchangeDelete={onchangeDelete}
              urlHistory="/admin/Products/AddProduct"
              dataSource={data.rows.map((ok, index) => ({
                key: ok.id,
                name: ok.name,
                img: (
                  <div className="img-table">
                    <img src={ok.avatar} />
                  </div>
                ),
                time: formatDate(ok.createdAt),
                action:
                  ok.status !== 0 ? (
                    <div className="status-icon" title="đã đăng bài" onClick={() => onchangeStatus(1, ok.id)}>
                      {statusOn}
                    </div>
                  ) : (
                    <div className="status-icon" title="chưa đăng bài" onClick={() => onchangeStatus(0, ok.id)}>
                      {statusOff}
                    </div>
                  ),
              }))}
            />
            <Pagination
              onChange={(e, i) => {
                setPage(i);
              }}
              count={countPagination(data.count)}
              color="secondary"
              variant="outlined"
              shape="rounded"
            />
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </PageWrapper>
  );
}
