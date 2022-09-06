/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ReactDropzone from 'react-dropzone';
import { isString } from 'lodash';
import Iconify from '../Iconify';
import './Dropzone.scss';

const VALID_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];

const Dropzone = ({ defaultValue, name, handleUpload, error, errorText, placeholder }) => {
  const [fileNames, setFileNames] = useState([]);
  const [filePreview, setFilePreview] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue && isString(defaultValue)) {
      setFilePreview(defaultValue);
    }
  }, [defaultValue]);

  const handleDrop = (acceptedFiles) => {
    setFileNames(acceptedFiles.map((file) => file.name));

    const [file] = acceptedFiles;

    if (file && VALID_IMAGE_TYPES.includes(file.type)) {
      // const reader = new FileReader();

      // reader.readAsDataURL(file);
      // reader.onload = (e) => {
      // };
      handleUpload(file);

      const url = URL.createObjectURL(file);
      setFilePreview(url);
    }
  };

  const handleRemoveFile = () => {
    handleUpload(undefined);
    setFilePreview(undefined);
  };

  return (
    <>
      <div className={`dropzone ${error ? 'error' : ''}`}>
        <ReactDropzone
          noKeyboard
          onDrop={handleDrop}
          multiple={false}
          accept={{
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p name={name}>{placeholder}</p>
            </div>
          )}
        </ReactDropzone>
        <div className="dropzone-wrapper">
          {filePreview && <img src={filePreview} alt="National ID" />}
          {filePreview && (
            <div className="dropzone-wrapper__close">
              <Iconify
                onClick={handleRemoveFile}
                icon="ant-design:close-circle-outlined"
                sx={{ width: 30, height: 30, ml: 1 }}
              />
            </div>
          )}
        </div>
      </div>
      {error && <p className="error">{errorText}</p>}
    </>
  );
};

export default Dropzone;
