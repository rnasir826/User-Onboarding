import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import Input from "./Input"



export default function Form() {

    //this is the react state
    const defaultState = {
        name: "",
        email: "",
        password: "",
        terms: false 
    }

    const [formState, setFormState] = useState(defaultState);
    const [errors, setErrors] = useState(defaultState);
    const [buttonDisabled, setButtonDisabled] = useState(true);


    //this is the formState schema

    let formSchema = yup.object().shape({
        name: yup
            .string()
            .required("Please enter a name."),
        email: yup
            .string()
            .required("Please enter an email address.")
            .email("Not a valid email address."),
        password: yup
            .string()
            .required("Enter a Password")
            .password("Not a valid Password"),
        terms: yup
          .boolean()
          .oneOf([true], "Please agree to the terms and conditions")
      });

    useEffect(() => {
        if (formState.state.terms) {
            setButtonDisabled(!formState.terms);
        }
    },[formState]);

    useEffect(() => {
        if(formSchema.state.terms){
            setButtonDisabled(!formState.terms);
        }
    }, [formState]);

    const formSubmit=e => {
        e.preventDefault();
        console.log("form submitted");
        axios
           .post("https://reqres.in/api/users", formState)
           .then(() => console.log("form submitted sucessfully"))
           .catch(err => console.log(err));
    };
    const validateChange=e => {
        e.persist();
        if(e.target.value.length === 0) {
            setErrors({
                ...errors,
                [e.target.name]: `${e.target.name} is a required field.`
            });
        }
    };

    const inputChange = e => {
        const value=
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({
            ...formState,
            [e.target.name]: value
        });
        validateChange(e);
    };
    return (
        <form onSubmit={formSubmit}>
            <Input
               type="text"
               name="name"
               onChange={inputChange}
               value={formState.name}
               label="Name"
               errors={errors}
           />
           <Input
               type="email"
               name="email"
               onChange={inputChange}
               value={formState.email}
               label="Email"
               errors={errors}
           />
           <Input 
               type="text"
               name="password"
               onChange={inputChange}
               value={formState.password}
               label="Password"
               errors={errors}
           />
           <label className="terms" htmlFor="terms">
               <Input 
                   type="checkbox"
                   name="terms"
                   onChange={inputChange}
               />
           </label>
           <button disabled={buttonDisabled}>Submit</button>
        </form>
    );
}