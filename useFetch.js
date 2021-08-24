import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

    const isMounted = useRef(true); //isMounted es true al cargar el componente, para indicar que está montado
    const [state, setState] = useState({data: null, loading: true, error: null});

    //Este useEffect solo se invocará una vez, al cargar el componente, y su único propósito es utilizar el return,que se ejecuta al desmontar el componente,
    //para tomar acción cuando el mismo se desmonte. En este caso, setear la variable isMounted.current a false
    useEffect(() => {

        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        setState({data: null, loading: true, error: null}); //para limpiar la variable loading cada vez que se pide un nuevo quote

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                //El método setState solo se llamará si el componente aún está montado, para evitar que se invoque si el usuario
                //ocasionó el desmonte del componente antes de que el resultado del promise se ejecute
                if(isMounted.current){ 
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                } else {
                    console.log('setState no se invocó, el componente ya se había desmontado')
                }
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                })
            });
    }, [url])

    return state;
}