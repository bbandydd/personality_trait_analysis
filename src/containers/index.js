import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Layout, Menu, Breadcrumb } from 'antd';

import LifeStyle from './LifeStyle/LifeStyle';

const { Header, Content, Footer } = Layout;

const Main = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  const onSelectMenu = ({ key }) => {
    setSelectedKey(key);
  };

  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} onSelect={onSelectMenu}>
          <Menu.Item key="1">生活型態分析</Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          {selectedKey === '1' && <LifeStyle />}
        </div>
      </Content>
    </Layout>
  );
};

export default hot(Main);
