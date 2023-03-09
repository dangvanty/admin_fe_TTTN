import React from 'react';
import '#/assets/scss/Nav.scss';
import NavHeading from '#/components/Nav/NavHeading';
import NavMenu from '#/components/Nav/NavMenu';

export default function PageWrapper({ children }) {
  return (
    <div className="Nav">
      <NavMenu />
      <div className="nav-right">
        <NavHeading />
        <div className="NavContent">{children}</div>
      </div>
    </div>
  );
}
