import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import WeightApi from '#/api/weightApi';
import Spinner from '../Spin/Spinner';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';

export default function AddWeight() {
  const { id } = useParams();
  const [state, setState] = useState({
    loadSpin: false,
  });
  const { loadSpin } = state;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (id) {
      WeightApi.getOne(id).then((ok) => {
        reset(ok);
      });
    }
  }, []);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setState({ ...state, loadSpin: true });
    if (id) {
      await WeightApi.editWeight({
        weight: data.weight,
        id: id,
      });
    } else {
      await WeightApi.postWeight({
        weight: data.weight,
        status: 0,
      });
    }
    navigate('/Admin/Weight');
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Weight">Cân nặng</BreadcrumbsItem>
      <BreadcrumbsItem to="/admin/Weight/AddWeight">{id ? `Sửa cân nặng : ${id}` : 'Thêm cân nặng'}</BreadcrumbsItem>
      <div className="CreateAdmin">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>{id ? `Sửa cân nặng` : 'Thêm cân nặng'}</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-admin">
            <label htmlFor="">Cân nặng</label>
            <input type="text" {...register('weight', { required: 'Không được bỏ trống' })} />
            {errors.weight && <span className="text-danger">{errors.weight.message}</span>}
          </div>
          <div className="btn_submit">
            {loadSpin ? (
              <Spinner />
            ) : id ? (
              <input type="submit" value="Sửa cân nặng" />
            ) : (
              <input type="submit" value="Thêm mới" />
            )}
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}
