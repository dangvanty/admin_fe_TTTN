import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import billApi from '#/api/billApi';
import { countPagination, formatDate } from '#/helper/sub-function';
import Spinner from '../Spin/Spinner';
import Table from '../Table/Table';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
export default function Bill() {
  const titleTable = [
    { title: 'Người mua', name: 'user' },
    { title: 'Điện thoại', name: 'phone' },
    { title: 'Địa chỉ', name: 'address' },
    { title: 'Chi tiết', name: 'detail' },
    { title: 'Thời gian', name: 'time' },
  ];

  const [data, setdata] = useState(null);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    billApi
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
    history(`/admin/Bill/DetailBill/${e}`);
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Bill">Hóa đơn</BreadcrumbsItem>
      <div className="AdminTable">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Danh sách hoá đơn</h3>
          </div>
          <div className="heading__hr"></div>
        </div>

        {data !== null ? (
          <div>
            <Table
              titleTable={titleTable}
              hidentDot
              urlHistory="/admin/Bill/DetailBill"
              dataSource={data.rows.map((ok, index) => ({
                key: ok.id,
                user: ok.userName,
                phone: ok.phone,
                address: ok.address,
                detail: (
                  <p style={{ cursor: 'pointer', color: '#7740af' }} onClick={() => handleClickDetail(ok.id)}>
                    Chi tiết
                  </p>
                ),
                time: formatDate(ok.createdAt),
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
