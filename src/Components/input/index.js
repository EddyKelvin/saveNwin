import propTypes from "prop-types";
import { useState } from "react";
import colors from "../../Assets/colors";

function Input(props) {
  const [focused, setFocused] = useState(false);
  const getBorderColor = () => {
    if (props.error) {
      return colors.danger;
    }
    if (focused) {
      return colors.primary;
    } else {
      return colors.grey;
    }
  };
  const getFlexDirection = () => {
    if (props.icon && props.iconPosition) {
      if (props.iconPosition === "left") {
        return "row";
      } else {
        return "row-reverse";
      }
    }
    if (focused) {
      return colors.primary;
    } else {
      return colors.grey;
    }
  };
  const styling = {
    input: {
      height: "90%",
      width: "100%",
      margin: "auto",
      border: "none",
      fontSize: props.fontSize,
      backgroundColor: "transparent",
      flex: 1,
    },
    wrapper: {
      borderWidth: 4,
      display: "flex",
      height: props.height,
      borderRadius: props.br,
      paddingLeft: props.pl,
      paddingRight: props.pr,
      margin: props.margin,
      marginTop: props.ml,
      flexDirection: getFlexDirection(),
      border: props.br ? "1px solid " + getBorderColor() : "",
      alignItems: "center",
      backgroundColor: props.bg,
      paddingHorizontal: 10,
    },
    inputWrapper: {
      paddingVertical: 21,
      marginBottom: props.mb,
      width: props.width,
    },
    error: {
      color: colors.danger,
      textAlign: "center",
      fontSize: 12,
    },
  };

  return (
    <div style={styling.inputWrapper} className="inputWrapper">
      {props.title ? (
        <label
          style={{
            textAlign: "left",
            fontWeight: "bolder",
            color: "rgba(0,0,0,0.5)",
            fontSize: 12,
          }}
        >
          {props.title}
          {props.required ? <span style={{ color: "red" }}>*</span> : ""}
        </label>
      ) : (
        ""
      )}
      <div style={styling.wrapper}>
        {/* <span style={{cursor:'pointer',fontWeight:'bolder',fontSize:13,paddingLeft:props.pL}}>{props.type !='checkbox'?<FontAwesomeIcon onClick={props.doAction} color="#FCCA6B" icon={props.icon}/>:props.icon}</span> */}
        <input
          style={styling.input}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChangeText}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </div>
      {props.paragraph ? (
        <p style={{ color: "rgba(0,0,0,0.3)", fontSize: 10 }}>
          {props.paragraph}
        </p>
      ) : (
        ""
      )}

      {props.error && <span style={styling.error}>{props.error}</span>}
    </div>
  );
}

Input.propTypes = {
  title: propTypes.string,
  placeholder: propTypes.string,
  type: propTypes.string,
};

export default Input;
