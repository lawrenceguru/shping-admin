import React from 'react'
// import interact from 'interactjs'
import PropTypes from 'prop-types'
import { BoundingBox, BoundingBoxStage, BoundingBoxLabel, BoundingCheckbox } from './styles'

const DraggableBoundingBox = ({ index, styles, label, onCheckBoxChange, deleteBndBox }) => {
  // const handleUpdateCoordinates = ({ target, dx, dy }) => {
  //   const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx
  //   const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy
  //   const ymin = target.offsetTop + y
  //   const ymax = ymin + target.offsetHeight
  //   const xmin = target.offsetLeft + x
  //   const xmax = xmin + target.offsetWidth

  //   onUpdateCoordinate({ index, ymin, ymax, xmin, xmax })
  //   target.setAttribute('data-x', 0)
  //   target.setAttribute('data-y', 0)
  //   // eslint-disable-next-line no-param-reassign,no-multi-assign
  //   target.style.webkitTransform = target.style.transform = 'translate(0, 0)'
  // }
  // const handleDragMove = ({ target, dx, dy }) => {
  //   const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx
  //   const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy

  //   target.setAttribute('data-x', x)
  //   target.setAttribute('data-y', y)
  //   // eslint-disable-next-line no-param-reassign,no-multi-assign
  //   target.style.webkitTransform = target.style.transform = `translate(${x}px, ${y}px)`
  // }

  // const handleResizeMove = ({ target, rect, deltaRect }) => {
  //   let x = parseFloat(target.getAttribute('data-x')) || 0
  //   let y = parseFloat(target.getAttribute('data-y')) || 0

  //   // eslint-disable-next-line no-param-reassign
  //   target.style.width = `${rect.width}px`
  //   // eslint-disable-next-line no-param-reassign
  //   target.style.height = `${rect.height}px`
  //   x += deltaRect.left
  //   y += deltaRect.top

  //   target.setAttribute('data-x', x)
  //   target.setAttribute('data-y', y)
  //   // eslint-disable-next-line no-param-reassign,no-multi-assign
  //   target.style.webkitTransform = target.style.transform = `translate(${x}px, ${y}px)`
  // }

  const handleClick = e => {
    e.stopPropagation()

    onCheckBoxChange(!deleteBndBox.includes(index), index)
  }

  const handleChange = options => {
    onCheckBoxChange(options, index)
  }

  // useEffect(() => {
  //   const selector = interact(`.resize-drag-${index}`)
  //   selector.draggable({
  //     inertia: true,
  //     modifiers: [
  //       interact.modifiers.restrictRect({
  //         restriction: 'parent',
  //         endOnly: true
  //       })
  //     ],
  //     onmove: handleDragMove,
  //     onend: handleUpdateCoordinates
  //   })
  //   selector.resizable({
  //     inertia: true,
  //     modifiers: [
  //       interact.modifiers.restrictRect({
  //         endOnly: true
  //       }),

  //       interact.modifiers.restrictEdges({
  //         outer: 'parent',
  //         endOnly: true
  //       }),

  //       interact.modifiers.restrictSize({
  //         min: { width: 100, height: 50 }
  //       })
  //     ],
  //     onmove: handleResizeMove,
  //     onend: handleUpdateCoordinates,
  //     edges: { left: true, right: true, bottom: true, top: true }
  //   })
  //   return () => selector.unset()
  // }, [])

  return (
    <BoundingBox styles={styles} className={`resize-drag-${index} bounding-box`}>
      <BoundingBoxStage>
        <BoundingCheckbox onChange={handleChange} checked={deleteBndBox && deleteBndBox.includes(index)} />
        <BoundingBoxLabel onClick={handleClick}>{label}</BoundingBoxLabel>
      </BoundingBoxStage>
    </BoundingBox>
  )
}

DraggableBoundingBox.propTypes = {
  index: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  styles: PropTypes.object.isRequired,
  label: PropTypes.string,
  onCheckBoxChange: PropTypes.func.isRequired,
  // onUpdateCoordinate: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  deleteBndBox: PropTypes.array
}

DraggableBoundingBox.defaultProps = {
  label: '',
  deleteBndBox: null
}

export default DraggableBoundingBox
