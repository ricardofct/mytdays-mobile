import React, { Component, useState } from 'react';
import { View, ScrollView, Button, Text, Picker } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import validationService from './../../services/validation'
import { FormFieldInput, TextSeparator, LoginTouchableOpacity, LoginTouchableOpacityText, CalendarButton } from '../../styles';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment/min/moment-with-locales';
import api from '../../services/api';

class DiaryFormScreen extends Component {
    static navigationOptions = {
        title: 'DiaryForm',
    };


    state = {
        showCalendar: false,
        showHoraEntrada: false,
        showHoraSaida: false,
        error: null,
        vehiclesState: {
            error: null,
            isloading: false,
            values: []
        },
        form: {
            id: {
                type: "generic",
                value: ""
            },
            matricula: {
                type: "generic",
                value: ""
            },
            data: {
                type: "generic",
                value: new Date()
            },
            hora: {
                type: "generic",
                value: ""
            },
            flag: {
                type: "generic",
                value: ""
            },
            euro: {
                type: "generic",
                value: ""
            },
            km: {
                type: "generic",
                value: ""
            },
            invalid: true,
            valid: false
        }
    };
    getVehicles = async () => {
        try {
            this.setState({
                vehiclesState: {
                    error: null,
                    isLoading: true,
                    values: []
                }
            })
            const { data } = await api.get('/workers/vehicles');

            const values = data.vehicles.map(vehicle => ({ value: vehicle._id, viewValue: `${vehicle.plate} ${vehicle.name}` }))
                ;

            if (data.vehicles.length === 1) {
                this.onInputChange({ value: data.vehicles[0]._id, id: 'matricula' })
            }

            this.setState({
                vehiclesState: {
                    error: null,
                    isLoading: false,
                    values
                }
            })
        } catch (e) {
            this.setState({
                vehiclesState: {
                    error: e.data ? e.data.error : e.problem,
                    isLoading: false,
                    values: []
                }
            })
        }
    }

    async sendForm() {
        const { form } = this.state;

        try {
            this.setState({ error: null })
            const loginRes = await api.post('/workdays/startday', form);
            this.props.navigation.navigate('App');
        } catch (e) {
            this.setState({ error: e.data ? e.data.error : e.problem })
        }
    }

    setDate = (id, date) => {
        if (date) {
            console.log({ event, date });
            this.onInputChange({ value: date, id })
        }
        switch (id) {
            case 'data':
                this.setState({ showCalendar: false });
                break;
            case 'hora_entrada':
                this.setState({ showHoraEntrada: false });
                break;
            case 'hora_saida':
                this.setState({ showHoraSaida: false });
                break;

            default:
                break;
        }
    }

    constructor(props) {
        super(props);
        this.onInputChange = validationService.onInputChange.bind(this);
        this.getFormValidation = validationService.getFormValidation.bind(this);
        this.getField = validationService.getField.bind(this);

        const { navigation } = this.props;

        this.onInputChange({ value: navigation.getParam('itemId'), id: 'id' })

    }

    componentDidMount() {
        this.getVehicles();
    }

    render() {
        const { showCalendar, showHoraEntrada, showHoraSaida, vehiclesState } = this.state;
        const inputs = [];

        return (
            <View>
                <ScrollView>

                    {/* <FormFieldInput
                        type={2}
                        label="Data"
                        editable={false}
                        error={this.getField('data').errorLabel}
                        value={moment(this.getField('data').value).calendar(false)}
                        onInputFocus={() => this.setState({ showCalendar: true })}
                    ></FormFieldInput>

                    {showCalendar &&
                        <DateTimePicker value={this.getField('data').value}
                            display="spinner"
                            mode="date"
                            is24Hour={true}
                            onChange={(e, date) => this.setDate('data', date)}
                        />
                    } */}

                    <FormFieldInput

                        type={1}
                        label="Data /Hora entrada"
                        disabled={true}
                        value={moment(this.getField('data').value).format('HH:mm DD/MM/YYYY')}

                    ></FormFieldInput>

                    <FormFieldInput

                        type={3}
                        disabled={false}
                        list={vehiclesState.values}
                        label="Matricula"
                        error={vehiclesState.error}
                        value={this.getField('matricula').value}
                        onInputChange={(value) => {
                            this.onInputChange({ value, id: 'matricula' });
                        }}
                    ></FormFieldInput>

                    <FormFieldInput
                        type={1}
                        label="Bandeirada"
                        inputRef={(input) => { inputs.push(input) }}
                        blurOnInputSubmit={false}
                        returnInputKeyType={"next"}
                        onInputSubmitEditing={() => { inputs[2].focus(); }}
                        error={this.getField('flag').errorLabel}
                        onInputChange={(value) => {
                            this.onInputChange({ value, id: 'flag' });
                        }}
                    ></FormFieldInput>

                    <FormFieldInput

                        type={1}
                        label="Euros"

                        inputRef={(input) => { inputs.push(input) }}
                        blurOnInputSubmit={false}
                        returnInputKeyType={"next"}
                        onInputSubmitEditing={() => { inputs[5].focus(); }}
                        error={this.getField('euro').errorLabel}
                        onInputChange={(value) => {
                            this.onInputChange({ value, id: 'euro' });
                        }}
                    ></FormFieldInput>

                    <FormFieldInput

                        type={1}
                        label="Km's"

                        inputRef={(input) => { inputs.push(input) }}
                        blurOnInputSubmit={false}
                        returnInputKeyType={"next"}
                        onInputSubmitEditing={() => { inputs[8].focus(); }}
                        error={this.getField('km').errorLabel}
                        onInputChange={(value) => {
                            this.onInputChange({ value, id: 'km' });
                        }}
                    ></FormFieldInput>

                    <LoginTouchableOpacity
                        onPress={() => { this.getFormValidation(); console.log(this.state); }}
                    >
                        <LoginTouchableOpacityText >
                            Validar
                        </LoginTouchableOpacityText>
                    </LoginTouchableOpacity>

                    {console.log(inputs)}
                </ScrollView>

            </View >
        );
    }
}

export default DiaryFormScreen;
