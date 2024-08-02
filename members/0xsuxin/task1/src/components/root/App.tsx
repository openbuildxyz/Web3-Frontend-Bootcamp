import { Col, Divider, Row } from 'antd';
import Header from '../Header/index.tsx';
import ToDoList from '../ToDoList/index';

export function App() {
  return (
    <div className="h-screen">
      <Row justify="center">
        <Col span={16} className="mt-10">
          <Header />
          <Divider />
          <ToDoList />
        </Col>
      </Row>
    </div>
  );
}
