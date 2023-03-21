import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ServiceApi from '#/api/ServiceApi';
import { countPagination, formatDate } from '#/helper/sub-function';
import Spinner from '../Spin/Spinner';
import { add, statusOff, statusOn } from '#/assets/svg/IconSvg';
import Table from '../Table/Table';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
export default function Service() {
  const titleTable = [
    { title: 'Tên dịch vụ', name: 'name' },
    { title: 'Icon', name: 'icon' },
    { title: 'Thời gian', name: 'time' },
    { title: 'action', name: 'action' },
  ];

  const [data, setdata] = useState(null);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    ServiceApi.getAll({ page: page })
      .then((ok) => {
        setdata(ok.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load, page]);
  const history = useNavigate();
  const onchangeEdit = (e) => {
    history(`admin/Service/AddService/${e}`);
  };
  const onchangeDelete = async (e) => {
    await ServiceApi.deleteService(e);
    setLoad(!load);
  };
  const onchangeStatus = (e, id) => {
    setdata(null);
    if (e === 0) {
      ServiceApi.editService({ status: 1, id: id });
    } else {
      ServiceApi.editService({ status: 0, id: id });
    }
    setTimeout(() => {
      setLoad(!load);
    }, 500);
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Service">Dịch vụ</BreadcrumbsItem>
      <div className="AdminTable">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Dịch vụ</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <div className="add-admin">
          <button>
            <Link to={`/admin/Service/AddService`}>
              <div className="icon">{add}</div>
              <div className="text">Thêm dịch vụ</div>
            </Link>
          </button>
        </div>
        {data !== null ? (
          <div>
            <Table
              titleTable={titleTable}
              onchangeDelete={onchangeDelete}
              urlHistory="/admin/Service/AddService"
              onchangeEdit={onchangeEdit}
              dataSource={data.rows.map((ok, index) => ({
                key: ok.id,
                name: ok.name,
                icon: (
                  <div className="colorOrange">
                    {' '}
                    <div dangerouslySetInnerHTML={{ __html: ok.icon }} />
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
