import React, { useState, useContext } from "react";
import { Modal, Input, Button, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import usecontext from "../UseReducer/usecontext.js"

function EditSetpoint() {

  const { state, dispath } = useContext(usecontext)
  const { name, address, lng, lat, isModalOpen } = state;

  const showModal = () => {
    dispath({ type: "SHOW_MODAL_OPEN"})
  };

  const handleOk = () => {
    dispath({ type: "SHOW_MODAL_CLOSE"})
  };

  const handleCancel = () => {
    dispath({ type: "SHOW_MODAL_CLOSE"})
  };

  const handleName = (e: any) => {
    // setName(e.target.value);
    console.log('handle name')
    dispath({ type: "ON_CHANGE_NAME", payload: e.target.value})
  }

  const handleAddress = (e: any) => {
    // setAddress(e.target.value);
    dispath({ type: "ON_CHANGE_ADDRESS", payload: e.target.value})
  }

  return (
    <>

      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form name="wrap" labelCol={{ flex: '110px' }} labelAlign="left" labelWrap wrapperCol={{ flex: 1 }} colon={false} className="max-w-2xl mt-8">
          <Form.Item label="Tên địa điểm">
            <Input onChange={handleName} value={name}/>
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input onChange={handleAddress} value={address}/>
          </Form.Item>
          <Form.Item label="Vị trí">
            <Input className="w-5/6" value={state && state.lng && state.lat ? `${state.lng} x ${state.lat}` : ''} /> <Button><Link to="/vhtt/adsmap" ><SearchOutlined ></SearchOutlined></Link></Button>

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
