import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import GalleryApi from '#/api/galleryApi';
import { storage } from '#/helper/firebase';
import { messageShowErr } from '#/helper/sub-function';
import Spinner from '../Spin/Spinner';
import { camera } from '#/assets/svg/IconSvg';
import PageWrapper from '#/PageWrapper';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Breadcrumb from '../breadcumb/Breadcrumb';

export default function AddGallery() {
  const { id } = useParams();
  const [state, setState] = useState({
    loadSpin: false,
    linkImg: '',
    nameImg: '',
    img: '',
    imgId: '',
  });
  const { loadSpin, linkImg, nameImg, img, imgId } = state;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const hangdelimage = (e) => {
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      nameImg: e.target.files[0].name,
      img: e.target.files[0],
    });
  };
  useEffect(() => {
    if (id) {
      GalleryApi.getOne(id).then((ok) => {
        reset(ok);
        setState({
          ...state,
          imgId: ok.link,
        });
      });
    }
  }, []);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    if (img === '' && imgId === '') {
      messageShowErr('Chưa có ảnh!');
    } else {
      setState({ ...state, loadSpin: true });
      if (id) {
        if (img !== '') {
          await storage.ref(`imagesGallery/${img.name}`).put(img);
          const anh = await storage.ref('imagesGallery').child(img.name).getDownloadURL();
          await GalleryApi.editGallery({
            name: data.name,
            link: anh,
            id: id,
          });
        } else {
          await GalleryApi.editGallery({
            name: data.name,
            id: id,
          });
        }
      } else {
        await storage.ref(`imagesGallery/${img.name}`).put(img);
        const anh = await storage.ref('imagesGallery').child(img.name).getDownloadURL();
        await GalleryApi.postGallery({
          name: data.name,
          link: anh,
          status: 0,
        });
      }
      navigate('/Admin/Gallery');
    }
  };
  return (
    <PageWrapper>
      <BreadcrumbsItem to="/admin/Gallery">Thư viện ảnh</BreadcrumbsItem>
      <BreadcrumbsItem to="/admin/Gallery/AddGallery">{id ? `Sửa ảnh : ${id}` : 'Thêm ảnh'}</BreadcrumbsItem>
      <div className="CreateAdmin">
        <Breadcrumb />
        <div className="heading">
          <div className="heading__title">
            <h3>{id ? `Sửa ảnh : ${id}` : 'Thêm ảnh'}</h3>
          </div>
          <div className="heading__hr"></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-admin">
            <label htmlFor="">Tên ảnh</label>
            <input type="text" {...register('name', { required: true })} />
            {errors.name && <span className="text-danger">Không được bỏ trống</span>}
          </div>
          <div className="input-admin">
            <label htmlFor="">Ảnh đại diện</label>
            <div className="update">
              <div className="icon-avatar">
                <label htmlFor="avatar">{camera}</label>
                <input type="file" name="" id="avatar" hidden onChange={hangdelimage} />
              </div>
              {linkImg ? (
                <img src={linkImg} className="img-update" height="150px" width="250px" alt="" />
              ) : imgId ? (
                <img src={imgId} className="img-update" height="150px" width="250px" alt="" />
              ) : (
                ''
              )}
              <br />
              <span>{nameImg}</span>
            </div>
          </div>

          <div className="btn_submit">
            {loadSpin ? (
              <Spinner />
            ) : id ? (
              <input type="submit" value="Sửa Gallery" />
            ) : (
              <input type="submit" value="Thêm mới" />
            )}
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}
