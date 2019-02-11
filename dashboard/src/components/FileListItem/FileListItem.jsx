import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileImage,
  faFilePdf,
  faFile,
  faFileVideo,
  faFileAudio,
  faFileArchive,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import style from './FileListItem.module.scss';

const selectIcon = (mimetype) => {
  if (mimetype.includes('image/')) return faFileImage;
  if (mimetype === 'application/pdf') return faFilePdf;
  if (mimetype.includes('video/')) return faFileVideo;
  if (mimetype.includes('audio/')) return faFileAudio;
  if (mimetype.includes('/zip')) return faFileArchive;
  return faFile;
};

const FileListItem = React.memo(({ file }) => (
  <li className={style.wrapper} row="nowrap" mobile-wrap="" align="start center">
    <FontAwesomeIcon className="mr1" icon={selectIcon(file.mimetype)} />

    <div>
      <h6>{file.name}</h6>

      <a
        rel="noopener noreferrer"
        target="_blank"
        className="link"
        href={`${process.env.REACT_APP_API_URL}/${file.path}`}>
        Abrir arquivo
      </a>
    </div>

    <span flex="" />

    <button type="button" className="button red">
      <FontAwesomeIcon icon={faTrash} />
    </button>
  </li>
));

export default FileListItem;
