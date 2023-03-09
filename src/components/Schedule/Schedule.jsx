import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import scheduleApi from '#/api/ScheduleApi';
import { countPagination, formatDate } from '#/helper/sub-function';
import Spinner from '../Spin/Spinner';
import Table from '../Table/Table';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
export default function Schedule() {
  const titleTable = [
    { title: 'Người mua', name: 'name' },
    { title: 'Điện thoại', name: 'phone' },
    { title: 'Địa chỉ', name: 'address' },
    { title: 'Chi tiết', name: 'detail' },
    { title: 'Thời gian', name: 'time' },
  ];

  const [data, setdata] = useState(null);
  console.log('data', data);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    scheduleApi
      .getAll({ page: page })
      .then((ok) => {
        setdata(ok.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load, page]);
  const history = useNavigate();
  const handleClickDetail = (e) => {
    history(`/admin/Schedule/ScheduleDetail/${e}`);
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Schedule">Đặt Lịch</BreadcrumbsItem>
      <div className="AdminTable">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Đặt Lịch</h3>
          </div>
          <div className="heading__hr"></div>
        </div>

        {data !== null ? (
          <div>
            <Table
              titleTable={titleTable}
              hidentDot
              urlHistory="/admin/Schedule/ScheduleDetail"
              dataSource={data.rows.map((ok, index) => ({
                key: ok.id,
                name: ok.name,
                phone: ok.phone,
                address: ok.address,
                detail: (
                  <p style={{ cursor: 'pointer', color: '#a749ff' }} onClick={() => handleClickDetail(ok.id)}>
                    Chi tiết
                  </p>
                ),
                time: formatDate(ok.date),
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
