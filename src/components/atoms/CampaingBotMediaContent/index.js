import { connect } from 'react-redux'
import { postUpload, postUploadClear } from 'store/actions'
import CampaignBotMediaContent from './CampaignBotMediaContent'

const mapStateToProps = state => ({
  lastUploaded: state.upload.lastUploaded,
  isUploading: state.upload.isUploading,
  isUploadingVideo: state.upload.isUploadingVideo
})

export default connect(mapStateToProps, { postUpload, postUploadClear })(CampaignBotMediaContent)
