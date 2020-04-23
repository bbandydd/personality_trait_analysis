import React, { useState } from 'react';
import { Radio } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;

  .ant-radio-group {
    border-right: 1px solid #d9d9d9;
    margin-right: 1em;
  }
`;

const Num = styled.span`
  margin-right: 0.5em;
`;

const OPTIONS = [
  { label: '是', value: '4' },
  { label: '不一定', value: '2' },
  { label: '否', value: '0' },
];

const Question = (props) => {
  const {
    item: { id, content, score }, onChangeOption,
  } = props;

  const onChange = (e) => {
    onChangeOption(e.target.value);
  };

  return (
    <Container>
      <Radio.Group options={OPTIONS} onChange={onChange} value={score} />
      <Num>{id}.</Num>
      <span>{content}</span>
    </Container>
  )
};

export default Question;
