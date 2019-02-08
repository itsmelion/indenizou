import React, { PureComponent } from 'react';
import style from './FileUpload.module.scss';

class FileUpload extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { file: null };
    this.fileInput = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    console.log('event', event);
    console.log('FileInput :', this.fileInput);

    this.setState({ file: this.fileInput.current.files[0].name });
  }

  render() {
    const { file } = this.state;
    if (!file) return null;

    return (
      <section className={style.container}>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="file">
            Upload file:
            <input ref={this.fileInput} multiple type="file" name="file" id="file" />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>

        <h4>{file}</h4>
      </section>
    );
  }
}

export default FileUpload;
