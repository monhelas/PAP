import React from 'react';
import { Modal as AntModal, Space, Row, Col, Button } from 'antd'; 
import { bool, func, node, string, shape } from 'prop-types';

const Modal = ({
  title,
  children,
  isVisible,
  setIsVisible,
  footerButtons,
  icon,
  primaryButtonDisabled = false
}) => {
  const Title = () => (
    <Space>
      <Row align="middle">
        {icon && (
          <Col className="mr-3">
            <Row>{icon}</Row>
          </Col>
        )}
        <Col>{title}</Col>
      </Row>
    </Space>
  );

  return (
    <AntModal
      title={<Title />}
      centered
      closable={true}
      open={isVisible}
      maskClosable={false}
      onCancel={() => setIsVisible(false)}
      width={400}
      footer={[
        footerButtons?.secondary && (
          <Button
            key="secondary"                               
            onClick={footerButtons.secondary.onClick}
          >
            {footerButtons.secondary.text}
          </Button>
        ),
        footerButtons?.primary && (
          <Button
            key="primary"
            type="primary" 
            onClick={footerButtons.primary.onClick}
            disabled={primaryButtonDisabled}
          >
            {footerButtons.primary.text}
          </Button>
        )
      ]}
    >
      {children}
    </AntModal>
  );
};

Modal.propTypes = {
  title: string.isRequired,
  children: node.isRequired,
  isVisible: bool.isRequired,
  setIsVisible: func.isRequired,
  icon: node,
  footerButtons: shape({
    primary: shape({
      text: string,
      onClick: func
    }),
    secondary: shape({
      text: string,
      onClick: func
    })
  }),
  primaryButtonDisabled: bool
};

export default Modal;
