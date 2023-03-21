import React from 'react';
import { Link } from 'react-router-dom';
import '#/assets/scss/notfound.scss';
import { src_img } from '#/constants/constants';

const Notfound = () => {
  return (
    <>
      <div className="notfound">
        <aside>
          <img src={src_img.NOTFOUND} alt="" />
        </aside>
        <main>
          <h1>Xin lỗi!</h1>
          <p>
            Hoặc là bạn không đủ quyền để truy cập trang này hoặc nó không tồn tại{' '}
            <em>. . . như lẽ bình thường cuộc sống.</em>
          </p>
          <Link to={'/'}>Về trang chủ</Link>
        </main>
      </div>
    </>
  );
};

export default Notfound;
