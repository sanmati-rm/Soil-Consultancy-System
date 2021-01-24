import React from 'react'
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import reportService from '../service/reportService'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import {Link} from "react-router-dom"
import { Card, Grid, MenuItem } from '@material-ui/core';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const useStyles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      textAlign:'left',
    },
    card2:{
      backgroundColor : "#e1f5fe",
      color : "white",
      align:"center",
      width : 600,
      height: 210,
    },
    card1:{
      backgroundColor: "#e1f5fe",
      color:"white",
      width:600,
      height:190,
    },
    card3:{
      backgroundColor: "#e1f5fe",
      color:"white",
      width:450,
      height:120,
    },
    link:{
      color:"#ffffff"
    }
  });

const Crop =[
  {
    value:"Sugarcane",
    label:"Sugarcane"
  },
  {
    value:"Paddy",
    label:"Paddy"
  },
  {
    value:"Maize",
    label:"Maize"
  },
  {
    value:"Tomato",
    label:"Tomato"
  },
  {
    value:"Ragi",
    label:"Ragi"
  }
]

class reportForm extends React.Component{

    constructor(props){
      super(props);
      this.state ={
        reports:[],
        open_error_form: false,
        nitrogen : null,
        phosphor: null,
        potassium: null,
        calcium : null,
        magnesium:null,
        sulphur:null,
        iron:null,
        zinc:null,
        manganese:null,
        copper:null,
        molybdenum:null,
        boron:null,
        chlorine:null,
        crop:""
      };
    }
    

  componentDidMount(){
    this.retrieveAllReport();
  }

  retrieveAllReport() {
    reportService.retrieveAllReport().then((response) => {
      console.log(response);
      this.setState({reports: response.data})
    })
  }



    openErrorForm = (e) => {
      this.setState({
        open_error_form: true,
      });
    };

    handleClose = () => {
      this.setState({ open_error_form: false });
    };

    handleChange = (name) => (event) => {
      this.setState({
        [name]: event.target.value,
      });
    }


    handleSubmit = () => {
      if(
        this.state.nitrogen === null ||
        this.state.phosphor === null ||
        this.state.potassium === null ||
        this.state.calcium === null ||
        this.state.magnesium === null ||
        this.state.sulphur === null ||
        this.state.iron === null ||
        this.state.zinc === null ||
        this.state.manganese === null ||
        this.state.copper === null ||
        this.state.molybdenum === null ||
        this.state.boron === null ||
        this.state.chlorine === null ||
        this.state.nickel === null ||
        this.state.crop === ""
      )
        {
          this.openErrorForm();
        }
      else{
        var report ={
          nitrogen:this.state.nitrogen,
          phosphor:this.state.phosphor,
          potassium:this.state.potassium,
          calcium:this.state.calcium,
          magnesium:this.state.magnesium,
          sulphur:this.state.sulphur,
          iron:this.state.iron,
          zinc:this.state.zinc,
          manganese:this.state.manganese,
          copper:this.state.copper,
          molybdenum:this.state.molybdenum,
          boron:this.state.boron,
          chlorine:this.state.chlorine,
          nickel:this.state.nickel,
          crop:this.state.crop
        };
      console.log(report);
      reportService.createReport(report).then((response) => {
        
        this.retrieveAllReport();
      })

    }
    
    }
    render(){
        const { classes } = this.props;
        return(
            <div className = {classes.formPage,classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" className={classes.title}> Soil Consultancy System</Typography>
                    </Toolbar>
                </AppBar>
                <Typography variant="h4" style={{marginTop:20}}>REPORT DETAILS</Typography>
                <Typography variant="subtitle1">Please enter the report details below</Typography>
                <ValidatorForm autoComplete="off" style={{marginTop:20}} onSubmit={this.handleSubmit}>
                <Grid container spacing={10} style={{marginLeft:"5%"}}>
                  <Grid item>
                    <Card className={classes.card1}>
                        <Typography variant="h6" style={{color:"black"}}>PRIMARY NUTRIENTS</Typography>
                        <TextValidator
                        style={{ width: 500 }}
                        label="Nitrogen(kg/acre)"
                        onChange={this.handleChange("nitrogen")}
                        value={this.state.nitrogen}
                        />
                        <TextValidator
                        style={{ width: 500 }}
                        label="Phosphor(kg/acre)"
                        onChange={this.handleChange("phosphor")}
                        value={this.state.phosphor}
                        /> 
                          <TextValidator
                        style={{ width: 500 }}
                        label="Potassium(kg/acre)"
                        onChange={this.handleChange("potassium")}
                        value={this.state.potassium}
                        /> 
                    </Card></Grid>
                    <Grid item><Card className={classes.card1}>
                      <Typography variant="h6" style={{color:"black"}}>SECONDARY NUTRIENTS</Typography>
                        <TextValidator
                        style={{ width: 500 }}
                        label="Calcium(ppm)"
                        onChange={this.handleChange("calcium")}
                        value={this.state.calcium}
                        /> 
                          <TextValidator
                        style={{ width: 500 }}
                        label="Magnesium(ppm)"
                        onChange={this.handleChange("magnesium")}
                        value={this.state.magnesium}
                        /> 
                          <TextValidator
                        style={{ width: 500 }}
                        label="Sulphur(ppm)"
                        onChange={this.handleChange("sulphur")}
                        value={this.state.sulphur}
                        /> 
                    </Card></Grid>
               </Grid>
               <Typography variant="h6" style={{align:"center", marginTop:20}}>MICRO-NUTRIENTS</Typography>
               <Grid container spacing={10} style={{marginLeft:"5%"}}>
                 <Grid item>
                   <Card className={classes.card2}>
                   <TextValidator
                    style={{ width: 500 }}
                    label="Iron(ppm)"
                    onChange={this.handleChange("iron")}
                    value={this.state.copper}
                    /> 
                    <TextValidator
                    style={{ width: 500 }}
                    label="Zinc(ppm)"
                    onChange={this.handleChange("zinc")}
                    value={this.state.molybdenum}
                    /> 
                      <TextValidator
                    style={{ width: 500 }}
                    label="Manganese(ppm)"
                    onChange={this.handleChange("manganese")}
                    value={this.state.boron}
                    /> 
                    <TextValidator
                    style={{ width: 500 }}
                    label="Copper(ppm)"
                    onChange={this.handleChange("copper")}
                    value={this.state.copper}
                    /> 
                   </Card>
                 </Grid>
                 <Grid item>
                   <Card className={classes.card2}>
                    <TextValidator
                    style={{ width: 500 }}
                    label="Molybdenum(ppm)"
                    onChange={this.handleChange("molybdenum")}
                    value={this.state.molybdenum}
                    /> 
                      <TextValidator
                    style={{ width: 500 }}
                    label="Boron(ppm)"
                    onChange={this.handleChange("boron")}
                    value={this.state.boron}
                    /> 
                    <TextValidator
                    style={{ width: 500 }}
                    label="Chlorine(ppm)"
                    onChange={this.handleChange("chlorine")}
                    value={this.state.chlorine}
                    /> 
                    <TextValidator
                    style={{ width: 500 }}
                    label="Nickel(ppm)"
                    onChange={this.handleChange("nickel")}
                    value={this.state.nickel}
                    />
                   </Card>
                 </Grid></Grid>
                 <Grid container spacing={10} style={{marginLeft:"32%"}}>
                 <Grid item>
                   <Card className={classes.card3}>
                   <Typography variant="h6" style={{align:"center",color:"black"}}>CROP TYPE</Typography>
                    <TextValidator
                    style={{width:400}}
                    select
                    label="Crop Type"
                    onChange={this.handleChange("crop")}
                    value={this.state.crop}
                    >
                       {Crop.map((option) => (
                         <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                       ))}
                     </TextValidator>
                   </Card>
                 </Grid>
               </Grid>
                    
                <Button variant="contained" color="primary" type="submit" style={{marginTop:10}}>Confirm</Button>
                </ValidatorForm>
              
              <Button variant="contained" href="/result" style={{marginTop:10,backgroundColor:"#00ffff"}}>Let's find out</Button>
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

        );
    }
}

export default withStyles(useStyles)(reportForm);