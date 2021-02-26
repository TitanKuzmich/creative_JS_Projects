const rules = {
    name: {
        required: true,
        min: {
            value: 2,
            message: "Длина имени должна быть больше 2"
        }
    },
    email: {
        required: true,
        validation: {
            reg: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$",
            message: "Некорректный email"
        }
    }
}

export default rules;