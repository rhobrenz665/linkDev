import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import PorfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileExperince from './ProfileExperince';
import ProfileGithub from './ProfileGithub';
import Spinner from '../../components/shared/UIElements/Spinner';
import { getProfileById } from '../../actions/profile';

const Profile = ({ profile: { profile }, match, getProfileById }) => {
  const { id } = match.params;
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);
  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          <div className="profile-grid my-1">
            <ProfileHeader profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
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
