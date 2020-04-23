import React, { Fragment, useState } from 'react';
import { List, Collapse, Divider, Button, Tag } from 'antd';
import produce from 'immer';
import styled from 'styled-components';

import Question from './Question';
import QUESTION_DATA from './data/QUESTION';
import STYLE_DATA from './data/STYLE';

const Container = styled.div`
  .ant-divider-horizontal.ant-divider-with-text-left {
    ::before, ::after {
      border-top: 1px solid #000;
    }
  }

  .ant-list {
    margin-bottom: 1em;

    .ant-list-items {
      .ant-list-item:not(:last-child) {
        border-bottom: 1px solid #d9d9d9;
      }
    }
  }

  .ant-collapse {
    margin-bottom: 1em;
  }

  .ant-tag {
    font-size: 1em;
  }
`;

const { Panel } = Collapse;

const LifeStyle = () => {
  const [data, setData] = useState(QUESTION_DATA);
  const [styles, setStyles] = useState([]);

  const onChangeOption = (id, score) => {
    setData(produce(data, (draft) => {
      const matchItem = draft.find(o => o.id === id);
      matchItem.score = score;
    }));
  }

  const onReset = () => {
    setData(QUESTION_DATA);
    setStyles([]);
  };

  const onSubmit = () => {
    let max = -1;

    const result = STYLE_DATA
      .map(item => item.mode)
      .reduce((list, mode) => {
        const score = data.filter(item => item.mode === mode).reduce((acc, val) => acc += +(val.score), 0);
        max = max < score ? score: max;

        return [
          ...list,
          { mode, score },
        ];
      }, []);

    setStyles(result.filter(item => +(item.score) === max).map(item => item.mode));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      {
        styles.length === 0 ? (
          <Fragment>
            <Divider orientation="left">題目</Divider>
            <List
              bordered
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Question item={item} onChangeOption={(score) => onChangeOption(item.id, score)} />
                </List.Item>
              )}
            />
            <Button
              type="primary"
              // disabled={data.find(item => item.score === -1)}
              onClick={onSubmit}
            >
              送出
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Divider orientation="left">分析結果</Divider>
            {
              styles.map(mode => (
                <Tag color="#87d068">{STYLE_DATA.find(item => item.mode === mode).name}</Tag>
              ))
            }
            <Divider orientation="left">解析</Divider>
            <Collapse defaultActiveKey={styles}>
              {
                STYLE_DATA.map(item => (
                  <Panel header={item.name} key={item.mode}>
                    <Collapse defaultActiveKey={item.mode}>
                      <Panel header={item.header} key={item.mode}>
                        <ul>
                          {
                            item.message.map(m => <li>{m}</li>)
                          }
                        </ul>
                      </Panel>
                    </Collapse>
                  </Panel>
                ))
              }
            </Collapse>
            <Button
              type="primary"
              onClick={onReset}
            >
              重新測驗
            </Button>
          </Fragment>
        )
      }
    </Container>
  )
};

export default LifeStyle;
