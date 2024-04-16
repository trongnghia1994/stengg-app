import React, { useState, useEffect } from 'react';
import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { SampleEntity } from '../../../interfaces';

const { Search } = Input;

const DataTable = ({ reload }) => {
  const [data, setData] = useState<SampleEntity[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3100/sample-entities`, {
        params: {
          page: pagination.current,
          limit: pagination.pageSize,
          searchText,
        },
      });
      setData(response.data.items as SampleEntity[]);
      setPagination({
        ...pagination,
        total: response.data.meta.totalItems,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, searchText, reload]);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const handleSearch = (value) => {
    setPagination({ ...pagination, current: 1 });
    setSearchText(value);
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'ID',
    },
    {
      title: 'Post ID',
      dataIndex: 'postId',
      key: 'postId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
  ];

  return (
    <div>
      <Search
        placeholder="Search by name"
        enterButton={<SearchOutlined />}
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default DataTable;
