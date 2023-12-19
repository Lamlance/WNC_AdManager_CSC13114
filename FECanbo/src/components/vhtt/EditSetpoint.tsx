import React, { useState, useContext } from "react";
import { Modal, Input, Button, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, Routes, Route, useLocation } from 'react-router-dom'
// import usecontext from "../UseReducer/usecontext"

import { useDispatch, useSelector } from 'react-redux';
import { onChangeName, onChangeAddress, setLng, setLat, showModalClose, showModalOpen } from '../../slices/locationSlice.tsx';
import type { RootState } from '../../store.ts'

function EditSetpoint() {

  // const { state, dispatch } = useContext(usecontext)
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.location);

  const { name, address, lng, lat, isModalOpen } = location;

  const handleShowModal = () => {
    dispatch(showModalOpen())
    console.log('cc')
    console.log(location)
  }
  return (
    <>

      <Button type="primary" onClick={handleShowModal}>
        Open Modal
      </Button>
      <Modal title="" open={isModalOpen} onOk={() => dispatch(showModalClose())} onCancel={() => dispatch(showModalClose())} footer={null}>
        <Form name="wrap" labelCol={{ flex: '110px' }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} className="max-w-2xl mt-8">
          <Form.Item label="Tên địa điểm">
            <Input onChange={(e) => dispatch(onChangeName(e.target.value))} value={name} />
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
