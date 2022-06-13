/* eslint-disable import/prefer-default-export */
const defaultStream = {
  social_link_clicks: 0,
  cross_marketing_clicks: 0,
  link_clicks: 0,
  clicks: 0,
  clicks_spend: 0,
  video_views: 0,
  video_views_spend: 0,
  reviews: 0,
  reviews_spend: 0,
  impressions: 0,
  impressions_spend: 0,
  total_spend: 0
}

/**
 * Generates a stream with totals from all streams
 *
 * @param {object} streamsRecord
 * @return {object}
 */
const calculateStreamsTotal = streamsRecord => {
  let result = {}

  if (streamsRecord) {
    result = Object.keys(streamsRecord).reduce(
      (acc, streamId) => {
        Object.keys(streamsRecord[streamId]).forEach(actionName => {
          acc[actionName] += streamsRecord[streamId][actionName]
        })
        return acc
      },
      { ...defaultStream }
    )
  }

  return result
}

/**
 * Distribute O stream across all other streams by percent ratio
 * ("O" stands for "Other" and contains data from the old version of app)
 *
 * @param {object} streamsRecord
 * @return {object}
 */
// const distributeOtherStream = (streamsRecord, streamsTotal) => {
//   const result = {}
//   const currentStreams = { ...streamsRecord }
//   delete currentStreams.O
//   const otherKeys = Object.keys(streamsRecord.O)
//   Object.keys(currentStreams).forEach(streamId => {
//     result[streamId] = { ...streamsRecord[streamId] }
//     otherKeys.forEach(action => {
//       const percent = ((result[streamId][action] || 0) * 100) / (streamsTotal[action] - streamsRecord.O[action] || 1)
//       if (action.includes('spend')) {
//         result[streamId][action] =
//           (result[streamId][action] || 0) + ((streamsRecord.O[action] || 0) * percent) / 100 || 0
//       } else {
//         result[streamId][action] =
//           (result[streamId][action] || 0) + Math.round(((streamsRecord.O[action] || 0) * percent) / 100)
//       }
//     })
//   })
//   return result
// }

/**
 * Converts array of streams into a streams record.
 * In case if multiple streams have the same ids, values get added and merged into a single stream entry.
 *
 * @param {object[]} streams
 * @return {object} a record object, each key is a stream id
 */
const convertStreams = streams => {
  return streams.reduce((acc, { __typename, id, ...streamData }) => {
    if (!acc[id]) {
      acc[id] = { ...streamData }
    } else {
      const streamCopy = { ...acc[id] }
      Object.keys(streamCopy).forEach(action => {
        streamCopy[action] += streamData[action]
      })
      acc[id] = streamCopy
    }

    return acc
  }, {})
}

const StreamIdsMap = {
  S: 'organicProductScans',
  L: 'shoppingLists',
  F: 'featuredProductsTraffic',
  A: 'competitorsTraffic',
  O: 'other'
}

export const processSpendStreams = sourceData => {
  const streamedSpends = JSON.parse(JSON.stringify(sourceData))
  const streamsRecord = convertStreams(streamedSpends)
  const streamsTotal = calculateStreamsTotal(streamsRecord)

  if (streamsRecord.O) {
    // streamsRecord = distributeOtherStream(streamsRecord, streamsTotal)
  }

  const streams = Object.entries(streamsRecord).reduce((acc, [streamId, streamData]) => {
    acc.push({ ...streamData, key: StreamIdsMap[streamId] })
    return acc
  }, [])

  return [...streams, { ...streamsTotal, key: 'total' }]
}
