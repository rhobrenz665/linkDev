import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import PorfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileExperince from './ProfileExperince';
import ProfileGithub from './ProfileGithub';
import Spinner from '../../components/shared/UIElements/Spinner';
import { getProfileById } from '../../actions/profile';

const Profile = ({ profile, match, getProfileById }) => {
  const { id } = match.params;
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);
  return <div>Profile</div>;
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getProfileById,
})(Profile);
