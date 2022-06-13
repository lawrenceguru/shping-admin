import React, { useCallback, useMemo } from 'react'
import intl from 'react-intl-universal'
import { withRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'
import IconButton from '../IconButton'
import LoadingSpinner from '../../atoms/LoadingSpinner'
import { formatDate } from '../../../utils/helpers/date'
import CardImport from '../../atoms/CardImport'

const Card = ({ item, index, currentPage, paginationSize, handleRefresh, handleOnCardClick }) => {
  const error = useMemo(() => {
    return item && item.message && item.message.error
  }, [item])

  const hasAnErrorInUploadedFile = useMemo(() => {
    const badGTINs = item && item.bad_gtins && item.bad_gtins.length
    const badLines = item && item.bad_lines && item.bad_lines.length
    const badPrefixes = item && item.bad_prefixes && item.bad_prefixes.length
    return badGTINs || badLines || badPrefixes
  }, [item])

  const message = useMemo(() => {
    if (item && item.message && typeof item.message === 'string') {
      return hasAnErrorInUploadedFile
        ? intl.get('importProducts.failedLabel')
        : intl.get(`importProducts.importStatus.${item.message}`) || item.message
    }

    return error
  }, [item, hasAnErrorInUploadedFile, error])

  const tooltipMessage = useMemo(() => {
    return (
      item && item.processed_lines && item.total_lines && ((item.processed_lines / item.total_lines) * 100).toFixed(0)
    )
  }, [item])

  const tooltip = useMemo(() => {
    return item && message
      ? intl.get('importProducts.processedLabel', {
          denominator: item.total_lines || 0,
          numerator: item.processed_lines || 0,
          // eslint-disable-next-line no-restricted-globals
          percent: (!isNaN(tooltipMessage) && tooltipMessage) || 0
        })
      : intl.get('importProducts.startedLabel')
  }, [message, item, tooltipMessage])

  const renderRefreshButton = useCallback(() => {
    if (item.status === 'done') {
      return <IconButton type='Check' styleParam={{ color: '#ef3d46' }} />
    }
    if (item.status !== 'error') {
      return (
        <IconButton
          type='Refresh'
          actionFunction={e => {
            e.stopPropagation()
            e.preventDefault()
            handleRefresh(item.id)
          }}
        />
      )
    }
    return null
  }, [item, handleRefresh])

  const handleOnItemClick = useCallback(() => {
    if (hasAnErrorInUploadedFile) {
      const errors = item && (item.bad_lines || []).concat(item.bad_prefixes || [], item.bad_gtins || [])
      handleOnCardClick(errors)
    }
  }, [item, handleOnCardClick, hasAnErrorInUploadedFile])

  return (
    <LoadingSpinner key={item.id} isLoading={item.loading}>
      <CardImport
        header={intl.get('importProducts.importLabel', {
          count: (currentPage - 1) * paginationSize + (index + 1)
        })}
        mainInfo={[`${intl.get('importProducts.dateLabel')}: ${formatDate(item.ts)}`]}
        isAdditionalFields
        indexInfo={[
          `${intl.get('importProducts.statusLabel')}: ${intl.get(`importProducts.importStatus.${item.status}`) ||
            item.status}`,
          `${intl.get('importProducts.totalLines')}: ${item.total_lines || 0}`
        ]}
        handleOnCardClick={handleOnItemClick}
        renderButton={renderRefreshButton}
        isCursorPointer={hasAnErrorInUploadedFile}
      >
        <span>
          {intl.get('importProducts.messageLabel')}: {message || tooltip}
        </span>
        {!error && !hasAnErrorInUploadedFile && <IconButton type='InfoCircle' popText={tooltip} />}
      </CardImport>
    </LoadingSpinner>
  )
}

Card.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
  index: PropTypes.number,
  currentPage: PropTypes.number,
  paginationSize: PropTypes.number,
  handleRefresh: PropTypes.func.isRequired,
  handleOnCardClick: PropTypes.func.isRequired
}

Card.defaultProps = {
  item: null,
  index: undefined,
  currentPage: 1,
  paginationSize: 10
}

export default withRouter(Card)
