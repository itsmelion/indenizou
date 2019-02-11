import React, { PureComponent } from 'react';
import axios from 'axios';
import { flatMap } from 'lodash';
import { uploadFiles } from 'api';
import FileListItem from 'components/FileListItem/FileListItem';
import style from './FileUpload.module.scss';

class FileUpload extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { files: props.files || [], progress: 0 };
    this.fileInput = React.createRef();
    this.signal = axios.CancelToken.source();
  }

  componentWillUnmount() { this.signal.cancel(); }

  handleSubmit = (event) => {
    event.preventDefault();
    const { userID } = this.props;
    let { files } = this.fileInput.current;

    files = flatMap(files);

    const options = {
      'Content-Type': 'multipart/form-data',
      cancelToken: this.signal.token,
      onUploadProgress: (progressEvt) => {
        const percentage = Math.round((progressEvt.loaded * 100) / progressEvt.total);

        this.setState(({ progress: percentage }));
      },
    };

    return uploadFiles(userID, files, options)
      .then(data => this.setState(({ files: data })));
  }

  /**
   * @description Handle image preview of files
   */
  // handleFiles(files) {
  //   return files.map((file) => {
  //     if (!file.type.startsWith('image/')) return 0;

  //     const img = document.createElement('img');
  //     img.file = file;

  //     this.preview.current.appendChild(img);

  //     const reader = new FileReader();
  //     // eslint-disable-next-line no-param-reassign
  //     reader.onload = (aImg => (e) => { aImg.src = e.target.result; })(img);
  //     return reader.readAsDataURL(file);
  //   });
  // }

  render() {
    const { files, progress } = this.state;
    const isLoading = progress && progress < 100;
    return (
      <div className={style.container}>
        <form className="mv2" onSubmit={this.handleSubmit}>
          {!isLoading && (
            <fieldset>
              <label htmlFor="file">
                <p>Upload file</p>
                <input ref={this.fileInput} multiple type="file" name="file" id="file" />
              </label>

              <br />
              <button className="button" type="submit">Enviar</button>
            </fieldset>
          )}

          {!!isLoading && (
            <div className={style.progress}>
              <progress value={progress} max="100" />
            </div>
          )}
        </form>

        <section className={style.filesList}>
          {!!files.length && files.map(file => <FileListItem key={file.id} file={file} />)}
        </section>
      </div>
    );
  }
}

export default FileUpload;
