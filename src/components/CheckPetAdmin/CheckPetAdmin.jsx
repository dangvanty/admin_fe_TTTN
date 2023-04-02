import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Link, useResolvedPath } from 'react-router-dom';
import petApi from '#/api/petApi';
import { countPagination, formatDate, messageShowErr, messageShowSuccess } from '#/helper/sub-function';
import Spinner from '../Spin/Spinner';
import { check, notCheck } from '#/assets/svg/IconSvg';
import Table from '../Table/Table';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
export default function CheckPetAdmin() {
  const url = useResolvedPath('').pathname;
  const titleTable = [
    { title: '#id', name: 'key' },
    { title: 'Tên', name: 'name' },
    { title: 'Người dùng', name: 'user' },
    { title: 'Thời gian', name: 'time' },
    { title: 'Duyệt', name: 'action' },
  ];

  const [data, setdata] = useState(null);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    petApi
      .getCheckAdmin({ page: page })
      .then((ok) => {
        console.log(ok.rows);
        setdata(ok?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load, page]);
  const onchangeStatus = (e, id) => {
    setdata(null);
    console.log(e);
    if (e === 1) {
      petApi
        .editpet({ checkAdmin: 2, id: id })
        .then((data) => {
          messageShowSuccess('Sửa thành công!');
        })
        .catch((err) => {
          messageShowErr('Có lỗi xảy ra!');
        });
    } else {
      petApi
        .editpet({ checkAdmin: 1, id: id })
        .then((data) => {
          messageShowSuccess('Sửa thành công!');
        })
        .catch((err) => {
          messageShowErr('Có lỗi xảy ra!');
        });
    }
    setTimeout(() => {
      setLoad(!load);
    }, 500);
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/CheckPet">Kiểm tra thú cưng</BreadcrumbsItem>
      <div className="AdminTable">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Kiểm tra thú cưng</h3>
          </div>
          <div className="heading__hr"></div>
        </div>

        {data !== null ? (
          <div>
            <Table
              titleTable={titleTable}
              hidentDot={true}
              dataSource={data.map((ok, index) => ({
                key: ok.id,
                name: <Link to={`${url}/PetDetail/${ok.id}`}>{ok.name}</Link>,
                time: formatDate(ok.createdAt),
                user: ok.User.firstName + ' ' + ok.User.lastName,
                action:
                  ok.checkAdmin === 2 ? (
                    <div className="status-icon" onClick={() => onchangeStatus(2, ok.id)}>
                      {check}
                    </div>
                  ) : (
                    <div className="status-icon" onClick={() => onchangeStatus(1, ok.id)}>
                      {notCheck}
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
