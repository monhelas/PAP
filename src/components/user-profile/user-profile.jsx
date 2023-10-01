import React, { useState } from 'react';
import { Modal } from '../modal';
import { bool, func, string } from 'prop-types';
import { Input, Row, Col, Typography } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, UserOutlined, UndoOutlined } from '@ant-design/icons';

const UserProfile = ({ isVisible, setIsVisible, initialName, initialEmail, initialPassword }) => {
    
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState(initialPassword);

    const [prevEmail, setPrevEmail] = useState(initialEmail);
    const [prevPassword, setPrevPassword] = useState(initialPassword);

    const [isPasswordStrong, setIsPasswordStrong] = useState(true);

    const handleEmailChange = event => {
        const value = event.target.value;
        setEmail(value);
    };
    const handleEmailUndo = () => {
        setEmail(prevEmail);
    };

    const handlePasswordChange = event => {
        const value = event.target.value;
        const strongEnough = passwordRegex.test(value);
        setIsPasswordStrong(strongEnough);
        setPassword(value);
    };

    const handlePasswordUndo = () => {
        setPassword(prevPassword);
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    return (
        <Modal
            title="Account"
            icon={<UserOutlined />}
            hasCloseButton={true}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            primaryButtonDisabled={true}
            footerButtons={{
                primary: {
                    text: 'Save changes',
                    onClick: () => {}
                },
                secondary: {
                    text: 'Logout',
                    onClick: () => {}
                }
            }}
        >
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Typography className="font-bold text-lg opacity-30">Name</Typography>
                    <Input value={name} size="large" className="rounded-lg" />
                </Col>

                <Col span={24}>
                    <Typography className="font-bold text-lg opacity-30">Email</Typography>
                    <Input
                        size="large"
                        value={email}
                        className="rounded-lg"
                        onChange={handleEmailChange}
                        suffix={email !== prevEmail && <UndoOutlined onClick={handleEmailUndo} />}
                    />
                    {email !== initialEmail && (
                        <Typography style={{ color: 'grey', marginTop: '8px' }}>
                            You’ll receive a new link to confirm after proceeding
                        </Typography>
                    )}
                </Col>

                <Col span={24}>
                    <Typography className="font-bold text-lg opacity-30">Password</Typography>

                    {isPasswordStrong ? (
                        <Input.Password
                            size="large"
                            value={password}
                            className="rounded-lg"
                            onChange={handlePasswordChange}
                            iconRender={visible =>
                                visible ? <EyeInvisibleOutlined /> : <EyeOutlined />
                            }
                        />
                    ) : (
                        <Input
                            size="large"
                            value={password}
                            className="rounded-lg"
                            onChange={handlePasswordChange}
                            status={!isPasswordStrong ? 'error' : null}
                            suffix={<UndoOutlined onClick={handlePasswordUndo} />}
                        />
                    )}

                    {password !== initialPassword && !isPasswordStrong && (
                        <Typography style={{ color: 'red', marginTop: '8px' }}>
                            Can’t be this easy to guess
                        </Typography>
                    )}
                </Col>
            </Row>
        </Modal>
    );
};

UserProfile.propTypes = {
    isVisible: bool.isRequired,
    setIsVisible: func.isRequired,
    initialName: string.isRequired,
    initialEmail: string.isRequired,
    initialPassword: string.isRequired
};

export default UserProfile;
