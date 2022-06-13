/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import intl from 'react-intl-universal'
import { List, Collapse } from 'antd'
import { PrivateRoute } from 'containers'
import Typography from '../../atoms/Typography'
import pages from './pages'
import { ListItem, ListItem2nd, ListItem3rd, StyledIcon, Wrapper } from './styles'

const StyledNavItem = styled.div`
  display: flex;
  flex-direction: row;
  & div {
    margin-right: 10px;
    align-self: center;
  }
`

const Sidebar = ({ identityDeleteSession, location, isSidebarOpen, identity }) => {
  const isActive = useCallback(
    path => {
      // console.log(path)
      return location && location.pathname && location.pathname.includes(path)
    },
    [location]
  )

  return (
    isSidebarOpen && (
      <Wrapper>
        <List>
          {identity.modules &&
            pages(identity.modules).map(item => {
              const whitelist = item.systemOnly ? ['system'] : []
              if (item.haveSystem) {
                whitelist.push('haveSystem')
              }
              if (item.module) {
                let checkValidModule = false
                const checkValidRole = item.access ? identity.roles.includes(item.access) : true

                item.module.some(el => {
                  if (identity.modules.includes(el)) {
                    return (checkValidModule = true)
                  }
                  return null
                })

                if (checkValidModule && checkValidRole) {
                  return (
                    <PrivateRoute key={item.title} whitelist={whitelist}>
                      <Link to={Array.isArray(item.path) ? item.path[0] : item.path}>
                        <ListItem isActive={isActive(Array.isArray(item.path) ? item.path[0] : item.path)}>
                          <StyledNavItem>
                            <div>{item.icon}</div>
                            <div>
                              <Typography.Text strong>{item.title}</Typography.Text>
                            </div>
                          </StyledNavItem>
                        </ListItem>
                      </Link>
                    </PrivateRoute>
                  )
                }

                return null
              }
              if (item.config) {
                return (
                  <PrivateRoute key={item.title} whitelist={whitelist}>
                    <Collapse bordered={false} expandIconPosition='right'>
                      <Collapse.Panel
                        key='1'
                        header={
                          <PrivateRoute key={item.title} whitelist={whitelist}>
                            {Array.isArray(item.path) ? (
                              <ListItem2nd isActive={isActive(item.path)}>
                                <StyledNavItem>
                                  <div>{item.icon}</div>
                                  <div>
                                    <Typography.Text strong>{item.title}</Typography.Text>
                                  </div>
                                </StyledNavItem>
                              </ListItem2nd>
                            ) : (
                              <Link to={item.path}>
                                <ListItem2nd>
                                  <StyledNavItem>
                                    <div>{item.icon}</div>
                                    <div>
                                      <Typography.Text strong>{item.title}</Typography.Text>
                                    </div>
                                  </StyledNavItem>
                                </ListItem2nd>
                              </Link>
                            )}
                          </PrivateRoute>
                        }
                      >
                        {item.config.links.map(settingsItem => {
                          return !settingsItem.access ||
                            (identity && identity.roles && identity.roles.includes(settingsItem.access)) ? (
                            <PrivateRoute key={settingsItem.title} whitelist={whitelist}>
                              <Link to={Array.isArray(item.path) ? settingsItem.path[0] : settingsItem.path}>
                                <ListItem3rd
                                  isActive={isActive(
                                    Array.isArray(item.path) ? settingsItem.path[0] : settingsItem.path
                                  )}
                                >
                                  <StyledNavItem>
                                    <div>{settingsItem.icon}</div>
                                    <div>
                                      <Typography.Text strong>{settingsItem.title}</Typography.Text>
                                    </div>
                                  </StyledNavItem>
                                </ListItem3rd>
                              </Link>
                            </PrivateRoute>
                          ) : null
                        })}
                      </Collapse.Panel>
                    </Collapse>
                  </PrivateRoute>
                )
              }
              const checkValidRole = item.access ? identity.roles.includes(item.access) : true

              return (
                checkValidRole && (
                  <PrivateRoute key={item.title} whitelist={whitelist}>
                    <Link to={Array.isArray(item.path) ? item.path[0] : item.path}>
                      <ListItem isActive={isActive(Array.isArray(item.path) ? item.path[0] : item.path)}>
                        <StyledNavItem>
                          <div>{item.icon}</div>
                          <div>
                            <Typography.Text strong>{item.title}</Typography.Text>
                          </div>
                        </StyledNavItem>
                      </ListItem>
                    </Link>
                  </PrivateRoute>
                )
              )
            })}
          <PrivateRoute whitelist={[]}>
            <ListItem>
              <StyledNavItem>
                <div>
                  <StyledIcon type='logout' />
                </div>
                <div>
                  {' '}
                  <Link to='/' onClick={identityDeleteSession}>
                    <Typography.Text strong>{intl.get('navigation.signout')}</Typography.Text>
                  </Link>
                </div>
              </StyledNavItem>
            </ListItem>
          </PrivateRoute>
        </List>
      </Wrapper>
    )
  )
}

Sidebar.propTypes = {
  identityDeleteSession: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired
}

export default withRouter(Sidebar)
