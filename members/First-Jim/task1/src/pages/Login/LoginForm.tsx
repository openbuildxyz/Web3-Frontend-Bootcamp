import md5 from 'js-md5';
import { useState, useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined, CloseCircleOutlined } from '@ant-design/icons';

const LoginForm = (props: any) => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	const onFinish = async (loginForm) => {};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Form form={form} name="basic" labelCol={{ span: 5 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} size="large" autoComplete="off">
			<Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
				<Input placeholder="用户名：admin / user" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
				<Input.Password autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button
					onClick={() => {
						form.resetFields();
					}}
					icon={<CloseCircleOutlined />}
				>
					重置
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					确认
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;
