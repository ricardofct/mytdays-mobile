import React, { Component } from 'react';
import styled from 'styled-components/native'
import { Text, Picker } from 'react-native';


export const FormFieldInput = props => {
    const { inputRef,
        type,
        label,
        value,
        error,
        onInputChange,
        onInputFocus,
        blurOnInputSubmit = false,
        onInputSubmitEditing,
        returnInputKeyType,
        disabled = false,
        list = [] } = props;
    console.log(value ? value : '');
    return (<FormField>
        <FormLabel>{label}</FormLabel>

        {type === 1 && <FormInput
            value={value}
            editable={!disabled}
            onChangeText={param => {
                onInputChange(param)
            }}
            onFocus={param => {
                if (onInputFocus) {
                    onInputFocus(param)
                }
            }}
            ref={(input) => {

                if (inputRef) {
                    inputRef(input)
                }
            }}
            returnKeyType={returnInputKeyType}
            blurOnSubmit={blurOnInputSubmit}
            onSubmitEditing={() => {

                if (onInputSubmitEditing) {
                    onInputSubmitEditing()
                }
            }}
        />}


        {type === 2 && <CalendarButton
            onPress={() => {
                if (onInputFocus) {
                    onInputFocus();
                }
            }}>
            <Text> {value} </Text>
        </CalendarButton>}

        {type === 3 &&
            <FormSelect>
                <Picker enabled={!(disabled || !(list.length > 1))} selectedValue={value} onValueChange={param => {
                    onInputChange(param)
                }}>
                    {
                        list.length && <Picker.Item label="Selecionar" value={null} />
                    }
                    {
                        list.length ?
                            list.map((item, index) =>
                                <Picker.Item key={index} label={item.viewValue} value={item.value} />
                            ) :
                            <Picker.Item label="Sem valores" value={null} />
                    }
                </Picker>
            </FormSelect>
        }

        <FormError>{error}</FormError>
    </FormField>
    )
}

export const FormField = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
	align-items: stretch;
    margin: 0 10px;
    background: #f5f5f3;
`;

export const CalendarButton = styled.TouchableOpacity`
    padding: 16px 20px;
    border: 1px solid black;
    background: #f5f5f3;
`;

export const FormText = styled.Text`
    padding: 4px 20px;
`;
export const FormLabel = styled(FormText)`
    color: black;
`;
export const FormError = styled(FormText)`
    color: red;
`;

export const FormSelect = styled.View`
    border: 1px solid black;
    padding: 0 0 0 10px;
`;


export const FormInput = styled.TextInput`
    padding: 10px 20px;
    border: 1px solid black;
`;

export const AppInput = styled.TextInput`
    padding: 10px 20px;
    border: 1px solid black;
`;

export const LoginTouchableOpacity = styled.TouchableOpacity`
    width: 90%;
    margin-bottom: 20px;
    padding: 14px;
    border-radius: 25px;
    background: #46c7af;
    justify-content: center;
	align-items: center;
    color: #ffffff;
`;

export const LoginTouchableOpacityText = styled.Text`
    color: #ffffff;
`;
export const TextSeparator = styled.Text`
    padding: 4px 10px;
    margin: 20px 10px 10px;
    border-bottom-color: black;
    border-bottom-width: 1px;
`;