import React from 'react';
import style from './FileListItem.module.scss';

const FileListItem = React.memo(({ file }) => (
  <li className={style.wrapper}>
    <h6>{file.name}</h6>
  </li>
));

export default FileListItem;
