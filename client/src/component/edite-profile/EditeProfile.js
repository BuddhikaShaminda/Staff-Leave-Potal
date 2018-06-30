import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile,getCurrentProfile } from '../../actions/profileAction';
import isEmpty from '../../validations/is-empty';


class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      status: '',
      skills: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
        const profile = nextProps.profile.profile;
  
        // Bring skills array back to CSV
        const skillsCSV = profile.skills.join(',');
  
        // If profile field doesnt exist, make empty string

        profile.location = !isEmpty(profile.location) ? profile.location : '';
 
        profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
        profile.social = !isEmpty(profile.social) ? profile.social : {};
        profile.twitter = !isEmpty(profile.social.twitter)
          ? profile.social.twitter
          : '';
        profile.facebook = !isEmpty(profile.social.facebook)
          ? profile.social.facebook
          : '';
        profile.linkedin = !isEmpty(profile.social.linkedin)
          ? profile.social.linkedin
          : '';
        profile.youtube = !isEmpty(profile.social.youtube)
          ? profile.social.youtube
          : '';
        profile.instagram = !isEmpty(profile.social.instagram)
          ? profile.social.instagram
          : '';

 // Set component fields state
 this.setState({
    handle: profile.handle,
    location: profile.location,
    status: profile.status,
    skills: skillsCSV,
    githubusername: profile.githubusername,
    bio: profile.bio,
    twitter: profile.twitter,
    facebook: profile.facebook,
    linkedin: profile.linkedin,
    youtube: profile.youtube
  });
}
}

onSubmit(e) {
e.preventDefault();

const profileData = {
  handle: this.state.handle,
  location: this.state.location,
  status: this.state.status,
  skills: this.state.skills,
  bio: this.state.bio,
  twitter: this.state.twitter,
  facebook: this.state.facebook,
  linkedin: this.state.linkedin,
  youtube: this.state.youtube,
  instagram: this.state.instagram
};

this.props.createProfile(profileData, this.props.history);
}
  

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Senior Lecture', value: 'Senior Lecture' },
      { label: 'Lecture', value: 'Lecture' },
      { label: 'Assistant Lecture', value: 'Assistant Lecture' },
      { label: 'Instructor', value: 'Instructor' },
      { label: 'Non-Acedemic Staff', value: 'Student or Learning' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];



    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Update Your Profile</h1>
              <p className="lead text-center">
                Update information you need
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
          
              
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder=" Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(CreateProfile));
 