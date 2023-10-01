import React, { useState } from 'react';
import { Modal } from '../';
import { Rate, Row, Col, Input } from 'antd';
import PropTypes, { bool, string, node, func } from 'prop-types';

const { TextArea } = Input;

const UserFeedback = ({
    ratingTopics = [],
    description = '',
    hasTextArea = false,
    title,
    icon = null,
    hasCloseButton = false,
    isVisible,
    setIsVisible,
    onSubmit,
    secondaryButtonText = ''
}) => {
    const [ratings, setRatings] = useState({});
    const [comment, setComment] = useState('');

    const handleRateChange = (topic, value) => {
        setRatings(prevRating => ({
            ...prevRating,
            [topic]: value
        }));
    };

    const handleCommentChange = event => {
        const value = event.target.value;
        setComment(value);
    };

    return (
        <Modal
            title={title}
            icon={icon}
            hasCloseButton={hasCloseButton}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            footerButtons={{
                primary: {
                    text: 'Submit',
                    onClick: () => {
                        console.log('Ratings:', ratings);
                        console.log('Comment:', comment);
                        onSubmit(ratings, comment);
                    }
                },
                secondary: secondaryButtonText ? { text: secondaryButtonText } : null
            }}
        >
            <Row className="my-6"> {description}</Row>

            {ratingTopics.map(topic => {
                const { label, id } = topic;
                return (
                    <Row gutter={8} key={id} align="middle">
                        <Col>
                            <Rate
                                defaultValue={0}
                                value={ratings[id] || 0}
                                onChange={value => handleRateChange(id, value)}
                            />
                        </Col>
                        <Col>{label}</Col>
                    </Row>
                );
            })}

            <Row className="my-6">
                {(hasTextArea || ratingTopics.length === 0) && (
                    <TextArea rows={4} onChange={handleCommentChange} />
                )}
            </Row>
        </Modal>
    );
};

UserFeedback.propTypes = {
    ratingTopics: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            id: PropTypes.string
        })
    ),
    description: string.isRequired,
    hasTextArea: bool,
    icon: node,
    title: string.isRequired,
    hasCloseButton: bool,
    isVisible: bool.isRequired,
    setIsVisible: func.isRequired,
    onSubmit: func.isRequired,
    secondaryButtonText: string
};

export default UserFeedback;
