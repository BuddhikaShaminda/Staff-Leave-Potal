import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
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
      contact: '',
      location: '',

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
 
        profile.contact = !isEmpty(profile.contact) ? profile.contact : '';
      

 // Set component fields state
 this.setState({
    handle: profile.handle,
    location: profile.location,
    status: profile.status,
    skills: skillsCSV,
    contact: profile.contact,
    
 
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
  contact: this.state.contact,
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
      contact: this.state.contact,
     
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

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
            <Link to="/dashboard" className="btn btn-light">
                  Go Back
                </Link>
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
                  placeholder="Contact"
                  name="contact"
                  value={this.state.contact}
                  onChange={this.onChange}
                  error={errors.contact}
                  info="please input valid Number"
                />


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
 