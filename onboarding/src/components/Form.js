import React, { useState } from 'react'
import axios from 'axios';

import {registerSchema} from './schemas';


const Form = props => {
    const initialValues = {
        name: "",
        email: "",
        password: "",
        TOS: false
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState([]);
    const handleChange = e => {
        console.dir(e.target);
        if (e.target.name !== "TOS")
            setFormValues({
                ...formValues
                [name]: event.target.value
            });
        else {
            setFormValues({
                ...formValues,
                TOS: e.target.checked
            });
        }
        console.log(formValues);
    }
    const handleSubmit = e => {
        e.preventDefault();
        registerSchema.validate(formValues, { abortEarly: false })
            .then(_ => {
                axios.post('https://reqres.in/api/users', formValues)
                    .then(res => {
                        if (errors.length > 0) {
                            setErrors([]);
                        }
                        console.log(res);
                        props.setUsers([...props.users, res.data])
                        setFormValues(initialValues);
                    })
                    .catch(err => {
                    
                        console.dir(err);
                    });
            })
            .catch(err => {
                  
                console.dir(err);
              
                setErrors([...err.inner]);
            })
    }
    return(
        <form>
            <input
                name="name"
                type="text"
                onChange={handleChange}
                value={formValues.name}
                />
            <input
                name="email"
                type="email"
                onChange={handleChange}
                value={formValues.email}
                />
            <input
                name="password"
                type="password"
                onChange={handleChange}
                value={formValues.password}
                />
            <input
                name="TOS"
                type="checkbox"
                onChange={handleChange}
                defaultChecked={formValues.TOS}
                />
            {/* button has the handleSubmit function tied to its onClick attribute it is fired on clicking it */}
            <button onClick={handleSubmit}>Submit</button>
            {/* this chuck of JSX maps over the errors if present and accesses their "message" to display a message for each error message*/}
            <div>
                {errors.map( err => (  
                    <p style={{color: "red"}}>{err.message}</p>
                ))}
            </div>
        </form>
    )
}

export default Form;
        
            