import propTypes from "prop-types";
import colors from '../../Assets/colors';
import { LoadingOutlined } from "@ant-design/icons";

const Button = (props) =>{

    const getBgColor=()=>{
        if (props.disabled){
            return colors.grey;
        }
        if (props.primary){
            return colors.primary;
        }
        if (props.danger){
            return colors.danger;
        }
        if (props.secondary){
            return colors.secondary;
        }
        if (props.main){
            return colors.main;
        }
        if (props.twitter){
            return colors.twitter;
        }
        if (props.facebook){
            return colors.facebook;
        }
        if (props.bg){
            return props.bg;
        }
       
    }


    const styles={
        customButton:{
            backgroundColor:getBgColor(),
            height:props.height,
            borderRadius:props.br,
            width:props.width,
            margin:props.margin,
            marginTop:props.mt,
            marginBottom:props.mb,
            border:props.br?"1px solid "+props.brColor:"0px solid "+props.bg,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-evenly',
            alignItems:'center',
            cursor:'pointer',
            fontSize:props.fontSize
        },
        container:{
            display:'flex',
            flexDirection:'row',
            justifyContent: 'center',
            alignItems:'center',
            width:'100%'
        }
    }
    return(
        <div 
            disabled={props.disabled || props.loading}
            style={styles.customButton}
            className="customButton" onClick={props.onclick}>
            <div style={styles.container}>
            <span className="btn-title" style={{color:props.color, marginRight:5}}>
                { 
                    props.loading ?
                    <LoadingOutlined />
                    :
                    props.title
                }
            </span>
            </div>
        </div>
    );

}

Button.propTypes={
    title: propTypes.string
};
export default Button