import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useNavigate, useResolvedPath } from 'react-router';
import { Link, us } from 'react-router-dom';
import categoryApi from '#/api/CategoryApi';
import { countPagination, formatDate } from '#/helper/sub-function';
import Spinner from '../Spin/Spinner';
import { add, statusOff, statusOn } from '#/assets/svg/IconSvg';
import Table from '../Table/Table';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
export default function Category() {
  const navigate = useNavigate();
  const url = useResolvedPath('').pathname;
  const titleTable = [
    { title: 'Tên danh mục', name: 'name' },
    { title: 'Ảnh', name: 'avatar' },
    { title: 'Thời gian', name: 'time' },
    { title: 'action', name: 'action' },
  ];

  const [data, setdata] = useState(null);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    categoryApi
      .getAll({ page: page })
      .then((ok) => {
        setdata(ok.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load, page]);
  const onchangeEdit = (e) => {
    navigate(`/admin/Category/AddCategory/${e}`);
  };
  const onchangeDelete = async (e) => {
    await categoryApi.deletecategory(e);
    setLoad(!load);
  };
  const onchangeStatus = (e, id) => {
    setdata(null);
    if (e === 0) {
      categoryApi.editcategory({ status: 1, id: id });
    } else {
      categoryApi.editcategory({ status: 0, id: id });
    }
    setTimeout(() => {
      setLoad(!load);
    }, 500);
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Category">Danh mục sản phẩm</BreadcrumbsItem>
      <div className="AdminTable">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Danh mục sản phẩm</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <div className="add-admin">
          <button>
            <Link to={`${url}/AddCategory`}>
              <div className="icon">{add}</div>
              <div className="text">Thêm danh mục sản phẩm</div>
            </Link>
          </button>
        </div>
        {data !== null ? (
          <div>
            <Table
              titleTable={titleTable}
              onchangeDelete={onchangeDelete}
              onchangeEdit={onchangeEdit}
              urlHistory="/admin/Category/AddCategory"
              dataSource={data.rows.map((ok, index) => ({
                key: ok.id,
                name: ok.name,
                avatar: (
                  <div className="img-table">
                    <img src={ok.avatar} />
                  </div>
                ),
                time: formatDate(ok.createdAt),
                action:
                  ok.status !== 0 ? (
                    <div className="status-icon" onClick={() => onchangeStatus(1, ok.id)}>
                      {statusOn}
                    </div>
                  ) : (
                    <div className="status-icon" onClick={() => onchangeStatus(0, ok.id)}>
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
