import { Layout, Typography } from "antd";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => (
  <AntHeader>
    <Title style={{ color: "white", textAlign: "center" }} level={2}>
      待办事项应用
    </Title>
  </AntHeader>
);

export default Header;
