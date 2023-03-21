import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import newApi from '#/api/newApi';
import { countPagination, formatDate } from '#/helper/sub-function';
import Spinner from '../Spin/Spinner';
import { useNavigate } from 'react-router';
import { statusOff, statusOn, add } from '#/assets/svg/IconSvg';
import Table from '../Table/Table';
import { Pagination } from '@material-ui/lab';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
export default function New() {
  const titleTable = [
    { title: 'Tên tin tức', name: 'name' },
    { title: 'Ảnh', name: 'img' },
    { title: 'Người đăng', name: 'author' },
    { title: 'Thời gian', name: 'time' },
    { title: 'action', name: 'action' },
  ];

  const [data, setdata] = useState(null);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    newApi
      .getAll({ page: page })
      .then((ok) => {
        setdata(ok.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load, page]);
  const navigate = useNavigate();
  const onchangeEdit = (e) => {
    navigate.push(`/admin/New/AddNew/${e}`);
  };
  const onchangeDelete = async (e) => {
    await newApi.deletenew(e);
    setLoad(!load);
  };
  const onchangeStatus = (e, id) => {
    setdata(null);
    if (e === 0) {
      newApi.editnew({ status: 1, id: id });
    } else {
      newApi.editnew({ status: 0, id: id });
    }
    setTimeout(() => {
      setLoad(!load);
    }, 500);
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/New">Tin tức</BreadcrumbsItem>
      <div className="AdminTable">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Danh sách Tin tức</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <div className="add-admin">
          <button>
            <Link to={`/admin/New/AddNew`}>
              <div className="icon">{add}</div>
              <div className="text">Thêm tin tức</div>
            </Link>
          </button>
        </div>
        {data !== null ? (
          <div>
            <Table
              titleTable={titleTable}
              onchangeDelete={onchangeDelete}
              onchangeEdit={onchangeEdit}
              urlHistory="/admin/New/AddNew"
              dataSource={data.rows.map((ok, index) => ({
                key: ok.id,
                name: ok.name,
                img: (
                  <div className="img-table">
                    <img src={ok.avatar} />
                  </div>
                ),
                author: `${ok.User.firstName} ${ok.User.lastName}`,
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
