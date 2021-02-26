export const validateFormData = (data, rules) => {
    const errorsData = {}

    Object.keys(rules).forEach((key) => {
        let errorMessage = ""

        // Empty field validation
        if (rules[key].required && !data[key]) {
            errorMessage =
                rules[key].required && typeof rules[key].required === "string"
                    ? (rules[key].required)
        : "Заполните пожалуйста это поле"
        }

        // Min validation
        const minValue = rules[key].min ? rules[key].min.value : 0;
        if (!errorMessage && data[key].toString().length < minValue) {
            errorMessage = rules[key].min.message
        }

        // RegExp field validation
        if (!errorMessage && rules[key].validation && rules[key].validation.reg) {
            const condition = new RegExp(rules[key].validation.reg || "", "g")

            if (!condition.test(data[key].toString())) {
                errorMessage =
                    rules[key].validation && typeof rules[key].validation.message === "string"
                        ? (rules[key].validation.message)
            : "Некорректно введены данные"
            }
        }

        // Field equal other
        if (!errorMessage && rules[key].equal) {
            const otherFieldName = rules[key].equal.field || ""

            if (data[key] !== data[otherFieldName]) {
                errorMessage = rules[key].equal.message ? rules[key].equal.message : `${key} не совпадает с полем ${otherFieldName}`
                errorsData[otherFieldName] = errorMessage
            }
        }

        if (errorMessage) {
            errorsData[key] = errorMessage
        }
    })

    return { errors: errorsData, isValid: !Object.keys(errorsData).length }
}