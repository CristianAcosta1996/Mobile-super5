import { useEliminarDireccionMutation } from "../../../store/super5/super5Api";

export const useEliminarDireccion = () => {
    const [
        startEliminarDireccion,{ isLoading, isSuccess, data }
    ] = useEliminarDireccionMutation();
const isLoadingDelete = isLoading;
    const handleEliminarDireccion = async (
        id: string,
        direccion: string,
        ciudad: string,
        departamento: string,
        longitud: string,
        latitud: string,
        aclaracion: string,
        eliminado: boolean,

    ) => {
        startEliminarDireccion({
            id,
            direccion,
            ciudad,
            departamento,
            longitud,
            latitud,
            aclaracion,
            eliminado,
        }).unwrap()
            .then((resp: any) => {
                console.log(resp);
                alert(`Dirección eliminada con éxito!`);
            })
            .catch((error: any) => {
                alert(error.data);
            })

    };

    return { handleEliminarDireccion, isLoadingDelete }
}