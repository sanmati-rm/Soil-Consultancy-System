import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { GoogleLogin} from "react-google-login";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import customerService from '../service/customerService'


function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class Home extends React.Component{

  constructor(props){
    super(props);
    this.state={
      customers:[],
      customerEmail:"",
      customerFirstName:"",
      customerLastName:"",
      open_form : false,
      open_error_form:false
    };
  }
    
  componentDidMount(){
    this.retrieveAllCustomers();
  }

  retrieveAllCustomers() {
    customerService.retrieveAllCustomers().then((response) => {
      console.log(response);
      this.setState({customers : response.data});
    });
  }

  openAddCustomerForm = (e) => {
    this.setState({
      open_form: true,
    });
  };

  openErrorForm = (e) => {
    this.setState({
      open_error_form: true,
    });
  };

  handleClose = () => {
    this.setState({ open_form: false,open_error_form:false })
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }
  handleSubmit =() =>{
    if(
      this.state.customerEmail === "" ||
      this.state.customerFirstName === null ||
      this.state.customerLastName === null 
    )
    {
      this.openErrorForm();
    }
    else{
      var customer = {
        customerEmail:this.state.customerEmail,
        customerFirstName:this.state.customerFirstName,
        customerLastName:this.state.customerLastName
      }
      console.log(customer);
      customerService.createCustomer(customer).then((response) => {
          this.setState({open_form:false});
           this.retrieveAllCustomers();
      });
    }
  }

    render(){

        return(
            <div className="home">
                <Card className="Card" style={{backgroundColor:'#c8e6c9'}}>
                    <CardActionArea>
                     <CardContent>
                        <Typography variant="subtitle1" color="textSecondary">
                            Don't know what fertilizer to use to increase your crop's yield? Click here to find out!
                        </Typography>
                     </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button variant="contained" color="primary" style={{marginLeft:'28%'}} onClick={this.openAddCustomerForm}>Sign Up</Button>
                        <GoogleLogin
                        className="google-login-button"
                        clientId="402744950664-cefekape7t5m71d9ok33fun1pg5hgdb7.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.userlogin}
                        onFailure={this.responseGoogle}
                        isSignedIn={true}
                        cookiePolicy={"single_host_origin"}
                        />
                    </CardActions>
                </Card>
                <Dialog
                    open={this.state.open_form}
                    TransitionComponent={Transition}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                 >
                  <DialogContent>
                    <Paper
                    style={{
                      width: "500px",
                      height: "350px",
                      paddingLeft: "2%",
                      paddingRight: "0%",
                      paddingTop: "1%",
                    }}
                  >
                    <center>
                  <h3>SignUp by entering your details</h3>
                </center>
                <br />
                <center><ValidatorForm onSubmit={this.handleSubmit} autocomplete="off">
                <TextValidator
                        style={{ width: 400 }}
                        label="E-mail"
                        onChange={this.handleChange("customerEmail")}
                        value={this.state.customerEmail}
                        />
                        <TextValidator
                        style={{ width:400}}
                        label="First Name"
                        onChange={this.handleChange("customerFirstName")}
                        value={this.state.customerFirstName}
                        /> 
                          <TextValidator
                        style={{ width: 400 }}
                        label="Last Name"
                        onChange={this.handleChange("customerLastName")}
                        value={this.state.customerLastName}
                        /> 
                        <br/> <br/>
                        <center><Button
                    variant="contained"
                    color="primary"
                    style={{ width: "150px" }}
                    type="submit"
                  >
                    Submit
                  </Button></center>
                </ValidatorForm></center>
                </Paper>
                  </DialogContent>
                   <DialogActions>
                   <Button
                onClick={() => {
                  this.setState({ open_form: false });
                }}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
                    open={this.state.open_error_form}
                    TransitionComponent={Transition}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                 >
                    <DialogTitle id="alert-dialog-slide-title">
                        <span
                          style={{
                            fontFamily: "HelveticaforTargetBold,Arial",
                            color: "#646566",
                            fontWeight: "bolder",
                          }}
                        >
                          All fields are required!
                        </span>
                    </DialogTitle>
                   <DialogActions>
                    <Button
                      onClick={() => {
                        this.setState({ open_error_form: false })  
                      }}
                      
                      variant="outlined"
                      className="submit"
                      
                    >
                Okay
              </Button>
            </DialogActions>
          </Dialog>
                </div>
        )
    }
}

export default Home;