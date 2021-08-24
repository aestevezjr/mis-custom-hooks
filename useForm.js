import { useState } from "react";


export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }

    //handleInputChange recibe un "event args", que a su vez contiene un target.
    //target contiene el elemento desde el cual se llamó el handleInputChange. En estos casos, 
    //tendrá el html del input donde se esté escribiendo
    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            [target.name]: target.value //[target.name] entre corchetes: el valor que venga en target.name será el nombre de la propiedad que 
                                        //se está creando en el objeto del setValues
                                        //Si ya existe una entrada con nombre "target.name", se le reemplaza el valora esta, no se duplica
        });
    }

    return [values, handleInputChange, reset];
}