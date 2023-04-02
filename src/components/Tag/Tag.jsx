import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import tagApi from '#/api/tagApi';
import { countPagination, formatDate } from '#/helper/sub-function';
import Spinner from '../Spin/Spinner';
import { add, statusOff, statusOn } from '#/assets/svg/IconSvg';
import Table from '../Table/Table';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';
export default function Tag() {
  const titleTable = [
    { title: 'Tên tag', name: 'name' },
    { title: 'Thời gian', name: 'time' },
    { title: 'action', name: 'action' },
  ];

  const [data, setdata] = useState(null);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    tagApi
      .getAll({ page: page })
      .then((ok) => {
        setdata(ok.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load, page]);
  const history = useNavigate();
  const onchangeEdit = (e) => {
    history(`/admin/Tag/Addtag/${e}`);
  };
  const onchangeDelete = async (e) => {
    await tagApi.deletetag(e);
    setLoad(!load);
  };
  const onchangeStatus = (e, id) => {
    setdata(null);
    if (e === 0) {
      tagApi.edittag({ status: 1, id: id });
    } else {
      tagApi.edittag({ status: 0, id: id });
    }
    setTimeout(() => {
      setLoad(!load);
    }, 500);
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Tag">Tag</BreadcrumbsItem>
      <div className="AdminTable">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>Danh sách Tag</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <div className="add-admin">
          <button>
            <Link to={`/admin/Tag/Addtag`}>
              <div className="icon">{add}</div>
              <div className="text">Thêm tag</div>
            </Link>
          </button>
        </div>
        {data !== null ? (
          <div>
            <Table
              titleTable={titleTable}
              onchangeDelete={onchangeDelete}
              urlHistory="/admin/Tag/AddTag"
              onchangeEdit={onchangeEdit}
              dataSource={data.rows.map((ok, index) => ({
                key: ok.id,
                name: ok.name,
                time: formatDate(ok.createdAt),
                action:
                  ok.status !== 0 ? (
                    <div className="status-icon" title="active" onClick={() => onchangeStatus(1, ok.id)}>
                      {statusOn}
                    </div>
                  ) : (
                    <div className="status-icon" title="no-active" onClick={() => onchangeStatus(0, ok.id)}>
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
