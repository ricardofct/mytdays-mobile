import validatejs from "validate.js";

import { validationDictionary } from "./dictionary";

export default {
    onInputChange,
    getInputValidationState,
    validateInput,
    getFormValidation,
    getField
};

function getField(id, field = this.state.form) {
    if (typeof id === 'string') {
        return field[id];
    } else if (id.length === 1) {
        return field[id[0]];
    } else {
        let list = [...id];
        list.shift();
        return this.getField(list, field[id[0]]);
    }
}

function onInputChange({ id, value }) {
    const validation = validateValue({
        id, value,
        field: this.state.form
    });
    this.setState(
        {
            form: {
                ...this.state.form,
                ...validation
            }
        }
    );
}

function validateValue({ id, value, field }) {
    let validation = {};
    if (typeof id === 'string') {
        validation = getInputValidationState({
            input: field[id],
            value
        });
        return {
            [id]: {
                ...validation
            },
            valid: !validation.errorLabel,
            invalid: !!validation.errorLabel
        };
    } else if (id.length === 1) {
        validation = getInputValidationState({
            input: field[id[0]],
            value
        });
        return {
            [id[0]]: { ...validation },
            valid: !validation.errorLabel,
            invalid: !!validation.errorLabel
        };
    } else {
        let list = [...id];
        list.shift();
        return validateValue({ id: list, value, field: field[id[0]] });
    }
}

function getInputValidationState({ input, value }) {
    return {
        ...input,
        value,
        errorLabel: input.optional
            ? null
            : validateInput({ type: input.type, value })
    };
}

function validateInput({ type, value }) {
    const result = validatejs(
        {
            [type]: value
        },
        {
            [type]: validationDictionary[type]
        }
    );

    if (result) {
        return result[type][0];
    }

    return null;
}

function getFormValidation(form = this.state.form) {
    this.setState({
        form: formValidation(form)
    });
}

function formValidation(form) {
    const updatedInputs = {};
    let valid = true;
    let invalid = false;
    for (const [key, input] of Object.entries(form)) {
        if (input.group) {
            delete input.group;
            updatedInputs[key] = {
                group: true,
                ...formValidation(input)
            }
        } else {
            const value = getInputValidationState({
                input,
                value: input.value
            });
            valid = !value.errorLabel;
            invalid = !!value.errorLabel;
            updatedInputs[key] = value;
        }
    }
    console.log(valid, invalid)
    return { ...updatedInputs, valid, invalid };
}


