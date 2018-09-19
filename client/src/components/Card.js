import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
 
export default class MyForm extends React.Component {
 
    state = {}
 
    handleChange = (event) => {
      console.log(event.target.name)
      if(event.target.name=="email"){
        const email = event.target.value;
        this.setState({ email });
      }
      if(event.target.name=="token"){
        const token = event.target.value;
        this.setState({ token });
      } 
    }
 
    handleSubmit = () => {
        this.props.caller(this.state);
        this.setState({email:"",token:""})
    }
 
    render() {
        const { email,token } = this.state;
        return (
          <div className="myform">
            <h3>Fill in the details to send the transaction</h3>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    label="Email"
                    style={{width:"80%"}}
                    onChange={this.handleChange}
                    name="email"
                    value={email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <br/>
                <TextValidator
                    label="No of tokens"
                    onChange={this.handleChange}
                    style={{width:"80%"}}
                    name="token"
                    value={token}
                    validators={['required', 'matchRegexp:^[0-9]*$']}
                    errorMessages={['this field is required', 'It should only be a number']}
                />
                <br/>
                <Button variant="outlined" size="large" type="submit" color="secondary" style={{marginTop:"30px"}}>
        Submit
      </Button>
            </ValidatorForm>
            </div>
        );
    }
}
 