import { connect } from 'react-redux'
import {
  participantGetParticipantProfile,
  descriptionUpdateSources,
  settingsGetLanguages,
  postGdti,
  getGdti,
  clearGdtiInfo,
  updateGdti
} from 'store/actions'
import DocumentsWidgets from './DocumentsWidgets'

const mapStateToProps = state => ({
  updated: state.gdti.updated,
  participant: state.participant,
  isUpdatingSources: state.description.isUpdatingSources,
  languages: state.settings.languages,
  isLoadingLanguages: state.settings.isLoadingLanguages,
  currentParticipant: state.identity.current_participant,
  participants: state.identity.participants,
  editGdti: state.gdti.editGdti,
  isLoading: state.gdti.isLoading,
  editId: state.gdti.editId
})

export default connect(mapStateToProps, {
  participantGetParticipantProfile,
  descriptionUpdateSources,
  settingsGetLanguages,
  postGdti,
  getGdti,
  clearGdtiInfo,
  updateGdti
})(DocumentsWidgets)
