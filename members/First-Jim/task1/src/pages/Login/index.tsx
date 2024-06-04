import React from 'react';
import LoginForm from '@/pages/Login/LoginForm';
import './index.less';
import SvgIcon from '@/components/SvgIcon';
const Login: React.FC = () => {
	return (
		<div className="login-container">
			<div className="login-box">
				<div className="login-left"></div>
				<div className="login-form">
					<div className="login-logo">
						<SvgIcon name="react" />
						<span className="logo-text">CSP</span>
					</div>
					<LoginForm />
				</div>
			</div>
		</div>
	);
};

export default Login;
