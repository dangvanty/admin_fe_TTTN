import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import WeightApi from '#/api/weightApi';
import { countPagination, formatDate } from '#/helper/sub-function';
import Spinner from '../Spin/Spinner';
import { add, statusOff, statusOn } from '#/assets/svg/IconSvg';
import Table from '../Table/Table';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
export default function Weight() {
  const titleTable = [
    { title: 'Cân nặng', name: 'weight' },
    { title: 'Thời gian', name: 'time' },
    { title: 'action', name: 'action' },
  ];

  const [data, setdata] = useState(null);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    WeightApi.getAll({ page: page })
      .then((ok) => {
        setdata(ok.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load, page]);
  const history = useNavigate();
  const onchangeEdit = (e) => {
    history(`/admin/Weight/AddWeight/${e}`);
  };
  const onchangeDelete = async (e) => {
    await WeightApi.deleteWeight(e);
    setLoad(!load);
  };
  const onchangeStatus = (e, id) => {
    setdata(null);
    if (e === 0) {
      WeightApi.editWeight({ status: 1, id: id });
    } else {
      WeightApi.editWeight({ status: 0, id: id });
    }
    setTimeout(() => {
      setLoad(!load);
    }, 500);
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Weight">Cân nặng</BreadcrumbsItem>
      <div className="AdminTable">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Danh sách cân nặng</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <div className="add-admin">
          <button>
            <Link to={`/admin/Weight/AddWeight`}>
              <div className="icon">{add}</div>
              <div className="text">Thêm cân nặng</div>
            </Link>
          </button>
        </div>
        {data !== null ? (
          <div>
            <Table
              titleTable={titleTable}
              onchangeDelete={onchangeDelete}
              urlHistory="/admin/Weight/AddWeight"
              onchangeEdit={onchangeEdit}
              dataSource={data.rows.map((ok, index) => ({
                key: ok.id,
                weight: ok.weight,
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
