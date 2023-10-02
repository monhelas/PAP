import React, { useState } from 'react';
import { Card, Typography, Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;

const MultiSelection = ({ title, options, onOptionClick, currentOption = '' }) => {
  const [selectedOption, setSelectedOption] = useState(currentOption);

  const selectOption = option => {
    const { id } = option;

    if (id === selectedOption) {
      setSelectedOption('');
      onOptionClick('');
    } else {
      setSelectedOption(id);
      onOptionClick(option);
    }
  };

  return (
    <Card bodyStyle={{ width: '100%', textAlign: 'center' }}>
      <Title level={4}>{title}</Title>
      <div className="text-center">
        <Row gutter={[16, 16]} justify="center">
          {options.map(option => {
            const { id, label } = option;
            const isSelected = id === selectedOption;
            const buttonStyle = isSelected
              ? { background: '#1890ff', color: 'white' }
              : {};

            return (
              <Col key={id} span={12}>
                <Button
                  onClick={() => selectOption(option)}
                  className="w-full my-2"
                  style={buttonStyle}
                  size="large"
                >
                  {label}
                </Button>
              </Col>
            );
          })}
        </Row>
      </div>
    </Card>
  );
};

MultiSelection.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onOptionClick: PropTypes.func.isRequired,
  currentOption: PropTypes.string,
};

export default MultiSelection;
