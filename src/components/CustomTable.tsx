/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Table } from 'antd';
import { ProductTableType } from '../types/ProductTableType';


const CustomTable:React.FC<ProductTableType> = ({columns, data, loading}) => {
    return (
        <Table<any>
          loading={loading}
          className='border-[1px] border-slate-300 rounded-md'
          columns={columns}
          dataSource={data ? data : []}
        />
    )
};

export default CustomTable;