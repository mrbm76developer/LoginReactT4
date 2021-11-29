import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';

import Card from '../UI/Card/Card';
import './Login.css';
import Button from '../UI/Button/Button';
import AuthContext from "../Store/AuthContext";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {

        return {value: action.val, isValid: action.val.includes("@")};
    }
    if (action.type === 'VALID') {

        return {value: state.value, isValid: state.value.includes("@")};
    }
    return {value: "", isValid: false};
}

const passwordReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return {value: action.val, isValue: action.val.trim().length > 6};
    }
    if (action.type === "VALID") {
        return {value: state.value, isValid: state.value.trim().length > 6};
    }

    return {value: "", isValue: false};
}
const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: "", isValid: null});

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: "", isValid: null});

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;

    useEffect(() => {
            const timeout = setTimeout(() => {
                console.log('Check');
                setFormIsValid(emailIsValid && passwordIsValid);
            }, 500);
            return () => {
                console.log('Time');
                clearTimeout(timeout);
            };
        }
        , [emailIsValid, passwordIsValid]);

    const authCtx = useContext(AuthContext);

    const emailChangeHandler = (event) => {

        dispatchEmail({type: "USER_INPUT", val: event.target.value});
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({type: "USER_INPUT", val: event.target.value});
    };

    const validateEmailHandler = () => {
        dispatchEmail({type: "VALID"});
    };

    const validatePasswordHandler = () => {
        dispatchPassword({type: "VALID"});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value);
        } else if (!emailIsValid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
    };


    return (
        <Card className="login">
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    isValid={emailIsValid}
                    id={"email"}
                    label={"Email"}
                    type={"email"}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                <Input
                    ref={passwordInputRef}
                    isValid={passwordIsValid}
                    id={"password"}
                    label={"Password"}
                    type={"password"}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />
                <div className="actions">
                    <Button type="submit" className="btn">
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
