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
    { title: '#id', name: 'key' },
    { title: 'Người mua', name: 'name' },
    { title: 'Điện thoại', name: 'phone' },
    { title: 'Địa chỉ', name: 'address' },
    { title: 'Thời gian', name: 'time' },
    { title: 'Action', name: 'action' },
    { title: 'Chi tiết', name: 'detail' },
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
  const onchangeStatus = (e, id) => {
    setdata(null);
    if (e === 0) {
      if (window.confirm('Xác nhận lịch đặt này?')) {
        scheduleApi.editschedule({ status: 1, id: id });
      }
    } else {
      scheduleApi.editschedule({ status: 0, id: id });
    }
    setTimeout(() => {
      setLoad(!load);
    }, 500);
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Schedule">Đặt Lịch</BreadcrumbsItem>
      <div className="AdminTable">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Danh sách đặt Lịch</h3>
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
                action:
                  ok.status === 0 ? (
                    <div className="status-bill-no" title="chưa xác nhận" onClick={() => onchangeStatus(0, ok.id)}>
                      chưa xác nhận
                    </div>
                  ) : (
                    <div className="status-bill-yes" title="chưa xác nhận">
                      đã xác nhận
                    </div>
                  ),
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
