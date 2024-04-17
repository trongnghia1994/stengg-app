import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload as AntdUpload } from 'antd';

type Props = {
  onComplete?: () => void;
};

const getProps = ({ onComplete }): UploadProps => {
  return {
    name: 'file',
    action: `${process.env.API_HOST}/sample-entities/import_csv`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        onComplete();
        message.success(`${info.file.name} file uploaded (imported) successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload (import) failed.`);
      }
    },
  };
};

const Upload: React.FC<Props> = ({ onComplete }) => (
  <AntdUpload {...getProps({ onComplete })}>
    <Button icon={<UploadOutlined />}>Click to Upload CSV (Import Data)</Button>
  </AntdUpload>
);

export default Upload;
