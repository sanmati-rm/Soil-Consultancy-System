import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { Card, Grid} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import reportService from "../service/reportService"


const useStyles = (theme) => ({

    title: {
        flexGrow: 1,
        textAlign:'left',
      },
    card:{
    backgroundColor: "#e1f5fe",
    color:"white",
    width:450,
    height:250
    },
    typo:{
        textAlign:"center",
        color:"black"
    }

});


class result extends React.Component{

    constructor(props){
        super(props);
        this.state={
            reports:[]
        }
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

    render(){
        const { classes } = this.props;
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" className={classes.title}> Soil Consultancy System</Typography>
                    </Toolbar>
                </AppBar>
                <Typography variant="h5" style={{marginTop:100}}><b>CONSULTANCY REPORT</b></Typography>
                <Grid container spacing={6} style={{marginLeft:30, marginTop:20}}>
                    <Grid item>
                        <Card className={classes.card}> 
                            {this.state.reports.map((report) => 
                            {
                                if(report.nitrogen < 112)
                                {
                                    return(<div>
                                    <Typography variant="h6" className={classes.typo} style={{marginTop:10}}><b>Nitrogen</b></Typography>
                                    <Typography variant= "body1" className={classes.typo}>Crop Type: {report.crop}</Typography>
                                    <Typography variant= "body1" className={classes.typo}>Amount of Nitrogen Present : {report.nitrogen} kg/acre</Typography>
                                    <Typography variant= "body1"className={classes.typo}>Ideal dose of Nitrogen required : 112-228 kg/acre </Typography>
                                    <Typography variant= "body1" className={classes.typo} style={{color:"red"}}><b>Deficiency</b></Typography>
                                    <Typography variant= "body1" className={classes.typo}>Fertilizer to be applied : Urea (46% N)</Typography>
                                    <Typography variant= "body1" className={classes.typo}>Amount of Fertilizer to be applied = <b>(({report.nitrogen}+10)*100)/46 kg </b></Typography>
                                    </div>
                                    );
                                }
                                else if(report.nitrogen>=112 && report.nitrogen<=228){
                                    return(
                                        <div>
                                            <Typography variant="h6" className={classes.typo} style={{marginTop:10}}><b>Nitrogen</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Crop Type: {report.crop}</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Nitrogen Present : {report.nitrogen} kg/acre</Typography>
                                            <Typography variant= "body1"className={classes.typo}>Ideal dose of Nitrogen required : 112-228 kg/acre </Typography>
                                            <Typography variant= "body1" className={classes.typo} style={{color:"green"}}><b>Ideal</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Fertilizer to be applied : Urea (46% N)</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Fertilizer to be applied = <b>({report.nitrogen}*100)/46 kg </b></Typography>
                                        </div>
                                    )
                                }
                                else if(report.nitrogen>228){
                                    return(
                                        <div>
                                            <Typography variant="h6" className={classes.typo} style={{marginTop:10}}><b>Nitrogen</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Crop Type: {report.crop}</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Nitrogen Present : {report.nitrogen} kg/acre</Typography>
                                            <Typography variant= "body1"className={classes.typo}>Ideal dose of Nitrogen required : 112-228 kg/acre </Typography>
                                            <Typography variant= "body1" className={classes.typo} style={{color:"blue"}}><b>Over-Dose</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Fertilizer to be applied : Urea (46% N)</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Fertilizer to be applied = <b>(({report.nitrogen}-10)*100)/46 kg </b></Typography>
                                        </div>
                                    )
                                }
                            }
                            )}
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card}>
                            {this.state.reports.map((report) => {
                                if(report.phosphor<9){
                                    return(
                                        <div>
                                            <Typography variant="h6" className={classes.typo} style={{marginTop:10}}><b>Phosphor</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Crop Type: {report.crop}</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Phosphor Present : {report.phosphor}kg/acre</Typography>
                                            <Typography variant= "body1"className={classes.typo}>Ideal dose of Phosphor required : 9-22 kg/acre </Typography>
                                            <Typography variant= "body1" className={classes.typo} style={{color:"red"}}><b>Deficiency</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Fertilizer to be applied : Single Super Phosphate (16% P)</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Fertilizer to be applied = <b>(({report.phosphor}+10)*100)/16 kg</b></Typography>
                                        </div>
                                    );
                                }
                                else if(report.phosphor >=9 && report.phosphor<=22){
                                    return(
                                        <div>
                                            <Typography variant="h6" className={classes.typo} style={{marginTop:10}}><b>Phosphor</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Crop Type: {report.crop}</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Phosphor Present : {report.phosphor}kg/acre</Typography>
                                            <Typography variant= "body1"className={classes.typo}>Ideal dose of Phosphor required : 9-22 kg/acre </Typography>
                                            <Typography variant= "body1" className={classes.typo} style={{color:"green"}}><b>Ideal</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Fertilizer to be applied : Single Super Phosphate (16% P)</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Fertilizer to be applied = <b>({report.phosphor}*100)/16 kg</b></Typography>
                                        </div>
                                    )
                                }
                                else if(report.phosphor>22){
                                    return(
                                        <div>
                                            <Typography variant="h6" className={classes.typo} style={{marginTop:10}}><b>Phosphor</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Crop Type: {report.crop}</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Phosphor Present : {report.phosphor}kg/acre</Typography>
                                            <Typography variant= "body1"className={classes.typo}>Ideal dose of Phosphor required : 9-22 kg/acre </Typography>
                                            <Typography variant= "body1" className={classes.typo} style={{color:"blue"}}><b>Over-dose</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Fertilizer to be applied : Single Super Phosphate (16% P)</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Fertilizer to be applied = <b>(({report.phosphor}-10)*100)/16 kg</b></Typography>
                                        </div>
                                    )
                                }
                            }
                       )} 
                    </Card>
                    </Grid>
                    <Grid item>
                        <Card className={classes.card}>
                            {this.state.reports.map((report)=>{
                                if(report.potassium<60){
                                    return(
                                        <div>
                                            <Typography variant="h6" className={classes.typo} style={{marginTop:10}}><b>Potassium</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Crop Type: {report.crop}</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Potassium Present : {report.potassium} kg/acre</Typography>
                                            <Typography variant= "body1"className={classes.typo}>Ideal dose of Potassium required : 60-120 kg/acre </Typography>
                                            <Typography variant= "body1" className={classes.typo} style={{color:"red"}}><b>Deficiency</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Fertilizer to be applied : Meuriate of Potash (60% K)</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Fertilizer to be applied = <b>(({report.potassium}+10)*100)/60 kg</b></Typography>
                                        </div>
                                    )
                                }
                                else if(report.potassium>=60 && report.potassium<=120){
                                    return(
                                        <div>
                                          <Typography variant="h6" className={classes.typo} style={{marginTop:10}}><b>Potassium</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Crop Type: {report.crop}</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Potassium Present : {report.potassium} kg/acre</Typography>
                                            <Typography variant= "body1"className={classes.typo}>Ideal dose of Potassium required : 60-120 kg/acre </Typography>
                                            <Typography variant= "body1" className={classes.typo} style={{color:"green"}}><b>Ideal</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Fertilizer to be applied : Meuriate of Potash (60% K)</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Fertilizer to be applied = <b>({report.potassium}*100)/60 kg</b></Typography>  
                                        </div>
                                    )
                                }
                                else if(report.potassium>120){
                                    return(
                                        <div>
                                            <Typography variant="h6" className={classes.typo} style={{marginTop:10}}><b>Potassium</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Crop Type: {report.crop}</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Potassium Present : {report.potassium} kg/acre</Typography>
                                            <Typography variant= "body1"className={classes.typo}>Ideal dose of Potassium required : 60-120 kg/acre </Typography>
                                            <Typography variant= "body1" className={classes.typo} style={{color:"blue"}}><b>Over-dose</b></Typography>
                                            <Typography variant= "body1" className={classes.typo}>Fertilizer to be applied : Meuriate of Potash (60% K)</Typography>
                                            <Typography variant= "body1" className={classes.typo}>Amount of Fertilizer to be applied = <b>(({report.potassium}-10)*100)/60 kg</b></Typography>  
                                        </div>
                                    )
                                }
                            }
                            
                            )}
                        
                        </Card>
                    </Grid>
                </Grid>
                
                <Typography variant="h6" style={{marginTop:50}}>Please make sure to apply the correct amount of fertilizers to ensure your crop's best yeild</Typography>
            </div>
        );
    }

}
export default withStyles(useStyles)(result);