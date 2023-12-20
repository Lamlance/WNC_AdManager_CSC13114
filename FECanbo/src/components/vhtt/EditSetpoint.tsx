import React, { useState, useContext } from "react";
import { Modal, Input, Button, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, Routes, Route, useLocation } from 'react-router-dom'
// import usecontext from "../UseReducer/usecontext"

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store.ts'
import { onChangeLocation, onChangeAddress, setLng, setLat, setStatus } from '../../slices/pointSlice.tsx';
import { showModalClose } from "../../slices/modalSlice.tsx";

function EditSetpoint() {

  const dispatch = useDispatch();

  const point = useSelector((state: RootState) => state.point);
  const { location, address, lng, lat } = point;

  const modal = useSelector((state: RootState) => state.modal);
  const { isModalOpen } = modal;

  return (
    <>
      <Modal title="" open={isModalOpen} 
      // onOk={() => dispatch(showModalClose())}
       onCancel={() => dispatch(showModalClose())} footer={null}>
        <Form name="wrap" labelCol={{ flex: '110px' }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} className="max-w-2xl mt-8">
          <Form.Item label="Tên địa điểm">
            <Input onChange={(e) => dispatch(onChangeLocation(e.target.value))} value={location} />
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input onChange={(e) => dispatch(onChangeAddress(e.target.value))} value={address} />
          </Form.Item>
          <Form.Item label="Vị trí">
            <Input className="w-5/6" value={lng && lat ? `${lng} x ${lat}` : ''} /> <Button><Link to="/vhtt/adsmap" ><SearchOutlined ></SearchOutlined></Link></Button>

          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Hoàn thành
            </Button>
          </Form.Item>
        </Form>

      </Modal>


    </>
  );
}

export default EditSetpoint;
