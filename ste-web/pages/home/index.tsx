import React, { useState } from 'react';
import { Col, Divider, Row } from 'antd';
import DataTable from './_components/DataTable';
import Upload from './_components/Upload';

const App: React.FC = () => {
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  return (
    <>
      <Row>
        <Col span={8}>
          <Upload onComplete={() => setUploadComplete(true)} />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <DataTable reload={uploadComplete} />
        </Col>
      </Row>
    </>
  );
};

export default App;
