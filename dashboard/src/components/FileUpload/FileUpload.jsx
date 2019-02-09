import React, { PureComponent } from 'react';
import axios from 'axios';
import { flatMap } from 'lodash';
import { uploadFiles } from 'api';
import style from './FileUpload.module.scss';

class FileUpload extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { files: [] };
    this.fileInput = React.createRef();
    this.preview = React.createRef();
    this.progress = React.createRef();
    this.signal = axios.CancelToken.source();
  }

  componentWillUnmount() { this.signal.cancel(); }

  handleSubmit = (event) => {
    event.preventDefault();
    let { files } = this.fileInput.current;

    files = flatMap(files);

    const options = {
      'Content-Type': 'multipart/form-data',
      cancelToken: this.signal.token,
      onUploadProgress: (progressEvt) => {
        const percentage = Math.round((progressEvt.loaded * 100) / progressEvt.total);
        this.progress.current.innerHTML = percentage;
      },
    };

    this.setState({ files });
    this.handleFiles(files);
    return uploadFiles(this.props.userID, files, options);
  }


  handleFiles(files) {
    return files.map((file) => {
      if (!file.type.startsWith('image/')) return 0;

      const img = document.createElement('img');
      img.file = file;

      this.preview.current.appendChild(img);

      const reader = new FileReader();
      // eslint-disable-next-line no-param-reassign
      reader.onload = (aImg => (e) => { aImg.src = e.target.result; })(img);
      return reader.readAsDataURL(file);
    });
  }

  render() {
    const { files } = this.state;

    return (
      <div className={style.container}>
        <form className="mv2" onSubmit={this.handleSubmit}>
          <label htmlFor="file">
            <p>Upload file</p>
            <input ref={this.fileInput} multiple type="file" name="file" id="file" />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>

        {!!files.length && files.map(file => (
          <h4 key={file.name}>{file.name}</h4>
        ))}

        <h3 ref={this.progress}>Progress ...</h3>

        <div ref={this.preview} />
      </div>
    );
  }
}

export default FileUpload;
