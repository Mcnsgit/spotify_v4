import SideMenu from "./SideMenu.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSongs, fetchRecentlyPlayed, updateViewType } from '../../../redux/actions/songActions.js';
import { fetchAlbums } from '../../../redux/actions/albumActions.js';
import { fetchArtists } from '../../../redux/actions/artistActions.js';
import { fetchFeatured } from '../../../redux/actions/browseActions.js';
import { updateHeaderTitle } from '../../../redux/actions/uiActions.js';

const mapStateToProps = (state) => {

  return {
    userId: state.userReducer.user ? state.userReducer.user.id : '',
    token: state.tokenReducer.token ? state.tokenReducer.token : '',
    artistIds: state.artistsReducer.artistIds,
    title: state.uiReducer.title
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    fetchRecentlyPlayed,
    fetchSongs,
    fetchAlbums,
    fetchArtists,
    fetchFeatured,
    updateViewType,
    updateHeaderTitle,
  }, dispatch);

};

export const SideMenuConnected = connect(mapStateToProps, mapDispatchToProps)(SideMenu);

