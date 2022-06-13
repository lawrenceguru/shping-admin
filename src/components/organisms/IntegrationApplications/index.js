import React from 'react'
import { Form, Input, Button, Row, Col, Tabs, Checkbox } from 'antd'
import intl from 'react-intl-universal'
import { Wrapper, StyledForm } from './styles'

const { TabPane } = Tabs
const callback = key => {
  console.log(key)
}
const style = { background: '#000000', opacity: 0.65, padding: '8px 5px' }
const IntergrationsApplications = () => {
  return (
    <Wrapper>
      <StyledForm>
        <h1>Yotpo Reviews</h1>
        <Tabs defaultActiveKey='1' onChange={callback}>
          <TabPane tab='Overview' key='1'>
            <Form>
              <Row gutter={16}>
                <Col span={24}>
                  <p>{intl.get('integration.aplictionsTab.overview.context')}</p>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Checkbox danger>{intl.get('integration.aplictionsTab.overview.checkbox')}</Checkbox>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Button type='primary' danger>
                    {intl.get('integration.saveButton')}
                  </Button>
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane tab='Settings' key='2'>
            <h5>{intl.get('integration.aplictionsTab.settings.appKey')}</h5>
            <Form>
              <Row gutter={16}>
                <Col span={12} className='mb-10'>
                  <Input placeholder={intl.get('integration.aplictionsTab.settings.placeholder')} />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Checkbox danger>{intl.get('integration.aplictionsTab.settings.checkbox')}</Checkbox>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Button type='primary' danger>
                    {intl.get('integration.saveButton')}
                  </Button>
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane tab='Status' key='3'>
            <Form>
              <Row gutter={16}>
                <Col span={12}>
                  <div>
                    {intl.get('integration.aplictionsTab.status.status')}
                    <span className='activeStatus'>{intl.get('integration.aplictionsTab.status.active')}</span>
                  </div>
                </Col>
              </Row>
              <Row gutter={16} className='floatDiv'>
                <Col span={6}>
                  <div>{intl.get('integration.aplictionsTab.status.imported')}</div>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <Input defaultValue={215} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className='floatDiv'>
                <Col span={6}>
                  <div>{intl.get('integration.aplictionsTab.status.new')}</div>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <Input defaultValue={6} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Button type='primary' danger>
                    {intl.get('integration.aplictionsTab.status.button')}
                  </Button>
                </Col>
              </Row>
            </Form>
          </TabPane>
        </Tabs>
      </StyledForm>
      <StyledForm>
        <h1>{intl.get('integration.aplictionsTab.shpingKeys')}</h1>
        {/* <Row justify='start'>
          <Skeleton />
        </Row> */}
        <Row>
          <Col span={12}>
            <Row gutter={16} style={{ marginBottom: '10px' }}>
              <Col className='gutter-row' span={7}>
                <div style={style}>
                  <></>
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className='gutter-row' span={6}>
                <div style={style}>
                  <></>
                </div>
              </Col>
              <Col className='gutter-row' span={2}>
                <div style={style}>
                  <></>
                </div>
              </Col>
              <Col className='gutter-row' span={4}>
                <div style={style}>
                  <></>
                </div>
              </Col>
              <Col className='gutter-row' span={5}>
                <div style={style}>
                  <></>
                </div>
              </Col>
              <Col className='gutter-row' span={3}>
                <div style={style}>
                  <></>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </StyledForm>
    </Wrapper>
  )
}

export default IntergrationsApplications
