import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import contactApi from '#/api/contactApi';
import Spinner from '../Spin/Spinner';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';

export default function AddContact() {
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
      contactApi.getOne(id).then((ok) => {
        reset(ok);
      });
    }
  }, []);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setState({ ...state, loadSpin: true });
    if (id) {
      await contactApi.editcontact({
        email: data.email,
        address: data.address,
        phone: data.phone,
        description: data.description,
        id: id,
      });
    } else {
      await contactApi.postcontact({
        email: data.email,
        address: data.address,
        phone: data.phone,
        description: data.description,
        status: 0,
      });
    }
    navigate('/Admin/Contact');
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Contact">Liên hệ</BreadcrumbsItem>
      <BreadcrumbsItem to="/admin/Contact/AddContact">{id ? `Sửa liên hệ : ${id}` : 'Thêm liên hệ'}</BreadcrumbsItem>
      <div className="CreateAdmin">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>{id ? 'Sửa liên hệ' : 'Thêm liên hệ'}</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-admin">
            <label htmlFor="">Email</label>
            <input
              type="text"
              {...register('email', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 255, message: 'Vượt quá ký tự cho phép!' },
                pattern: {
                  value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                  message: 'Không đúng định dạng email!',
                },
              })}
            />
            {errors.email && <span className="text-danger">{errors.email.message}</span>}
          </div>
          <div className="input-admin">
            <label htmlFor="">Số điện thoại</label>
            <input
              type="text"
              {...register('phone', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 255, message: 'Vượt quá ký tự cho phép!' },
              })}
            />
            {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
          </div>
          <div className="input-admin">
            <label htmlFor="">Địa chỉ</label>
            <input
              type="text"
              {...register('address', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 500, message: 'Vượt quá ký tự cho phép!' },
              })}
            />
            {errors.address && <span className="text-danger">{errors.address.message}</span>}
          </div>
          <div className="input-admin">
            <label htmlFor="">Mô tả</label>
            <textarea
              rows="10"
              {...register('description', {
                required: 'Không được bỏ trống!',
                maxLength: { value: 1000, message: 'Vượt quá ký tự cho phép!' },
              })}
            ></textarea>
            {errors.description && <span className="text-danger">{errors.description.message}</span>}
          </div>
          <div className="btn_submit">
            {loadSpin ? (
              <Spinner />
            ) : id ? (
              <input type="submit" value="Sửa liên hệ" />
            ) : (
              <input type="submit" value="Thêm mới" />
            )}
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}
