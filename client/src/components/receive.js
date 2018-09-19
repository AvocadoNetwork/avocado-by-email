import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
 
export default class Receive extends React.Component {
 
    state = {}
    componentDidMount(){

    }
    handleChange = (event) => {

      if(event.target.name=="email"){
        const email = event.target.value;
        this.setState({ email });
      }
      if(event.target.name=="address"){
        const address = event.target.value;
        this.setState({ address });
      } 
    }
 
    handleSubmit = () => {
        this.props.caller(this.state);
    }
 
    render() {
        const { email,address } = this.state;
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
                    label="Sender Address"
                    onChange={this.handleChange}
                    style={{width:"80%"}}
                    name="address"
                    value={address}
                    validators={['required']}
                    errorMessages={['this field is required',]}
                />
                <br/>
                <Button variant="outlined" size="large" type="submit" color="primary" style={{marginTop:"30px"}}>
        Claim
      </Button>
            </ValidatorForm>
            </div>
        );
    }
}
 