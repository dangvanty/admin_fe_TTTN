import React from 'react';
import { spinner } from '#/assets/svg/IconSvg';
import '#/assets/scss/Spinner.scss';
export default function Spinner() {
  return (
    <div className="Spinner">
      <div className="icon">{spinner}</div>
    </div>
  );
}
