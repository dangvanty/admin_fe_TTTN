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
import { fCurrency } from '#/helper/formatNumber';
export default function Bill() {
  const titleTable = [
    { title: 'Người mua', name: 'user' },
    { title: 'Điện thoại', name: 'phone' },
    { title: 'Địa chỉ', name: 'address' },
    { title: 'Tổng tiền', name: 'total_price' },
    { title: 'Thời gian', name: 'time' },
    { title: 'action', name: 'action' },
    { title: 'Chi tiết', name: 'detail' },
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
  const onchangeStatus = (e, id) => {
    setdata(null);
    if (e === 1) {
      if (window.confirm('Xác nhận thanh toán đơn hàng này?')) {
        billApi.editbill({ status: 2, id: id });
      }
    } else {
      billApi.editbill({ status: 0, id: id });
    }
    setTimeout(() => {
      setLoad(!load);
    }, 500);
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
                user: ok.User.firstName + ' ' + ok.User.lastName,
                phone: ok.phone,
                total_price: fCurrency(ok.total_price),
                address: ok.address,
                action:
                  ok.status === 1 ? (
                    <div className="status-bill-no" title="chưa thanh toán" onClick={() => onchangeStatus(1, ok.id)}>
                      chưa thanh toán
                    </div>
                  ) : (
                    <div className="status-bill-yes" title="đã thanh toán">
                      đã thanh toán
                    </div>
                  ),
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
