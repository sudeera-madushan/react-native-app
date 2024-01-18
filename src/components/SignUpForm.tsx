import { Text, TextInput, View } from "react-native";
import React, {createRef, forwardRef, useImperativeHandle, useReducer, useState} from "react";
import { CustomInput } from "./CustomInput.tsx";
import { CustomButton } from "./CustomButton.tsx";

type FormState = {
    firstName: string;
    firstNameError: string | null;

    lastName: string;
    lastNameError: string | null;

    address: string;
    addressError: string | null;
}

type FormFieldSetAction = {
    formFieldName: string;
    formFieldValue: string;
}

const validate = (value: string | null) => {
    if (!value){
        return 'Please enter your first name';
    } else {
        if (value.length < 5) {
            return 'Please enter more than 5 characters';
        } else if (value.length > 10){
            return 'Please enter more less 10 characters';
        } else {
            return null;
        }
    }
};
const formFieldSetReducer = (state: FormState, action: FormFieldSetAction): FormState => {
    switch (action.formFieldName) {
        case 'firstName': {
            return {
                ...state,
                firstName: action.formFieldValue,
                firstNameError: !action.formFieldValue ? 'Please enter your first name' : null,
            };
        }
        case 'lastName': {
            return {
                ...state,
                lastName: action.formFieldValue,
                lastNameError: validate(action.formFieldValue),
            };
        }
        case 'address': {
            return {
                ...state,
                address: action.formFieldValue,
                addressError: null,
            };
        }
        default: {
            return state;
        }
    }
};

interface Props{
    changeTitle: Function
}

export const SignUpForm = forwardRef((props:Props, ref) => {

    const [name, setName] = useState('');
    // const [nameError, setNameError] = useState('');

    const [state, dispatch] = useReducer<(state: FormState, action: FormFieldSetAction) => FormState>(
        formFieldSetReducer,
        {
            firstName: '',
            firstNameError: null,

            lastName: '',
            lastNameError: null,

            address: '',
            addressError: null,
        }
    );

    useImperativeHandle(ref, ()=> {
        return(
            {
                setFirstName: (text:string) => {
                    dispatch({formFieldName: 'firstName', formFieldValue: text})
                },
                setLastName: (text:string) => {
                    dispatch({formFieldName: 'firstName', formFieldValue: text})
                }
            }
        )
    })

    return (
        <View style={{backgroundColor: 'skyblue', marginVertical: 25}}>

            <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center'}}>Sign Up</Text>

            <CustomInput
                label={'First Name'}
                value={state.firstName}
                onValueChange={(val) => dispatch({formFieldName: 'firstName', formFieldValue: val})}
                error={state.firstNameError}
            />

            <CustomInput
                label={'Last Name'}
                value={state.lastName}
                onValueChange={(val) => dispatch({formFieldName: 'lastName', formFieldValue: val})}
                error={state.lastNameError}
            />

            <CustomInput
                label={'Address'}
                value={state.address}
                onValueChange={(val) => dispatch({formFieldName: 'address', formFieldValue: val})}
                error={state.addressError}
            />

            <CustomButton
                label={'Set Home Title as Software Engineer'}
                onPress={() => {
                    props.changeTitle("Software Engineer")
                    console.log('button 2 press');
                }}
            />

        </View>
    );

});

