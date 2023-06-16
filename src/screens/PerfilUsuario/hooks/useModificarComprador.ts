import { useModificarCompradorMutation } from "../../../store/super5/super5Api";
import { useNavigation } from "@react-navigation/native";
export const useModificarComprador = () => {
    const navigation: any = useNavigation();
    const [
        startModificarComprador,
    ] = useModificarCompradorMutation();

    const handleModificarComprador = async (
        nombre: string,
        apellido: string,
        telefono: string,
        fechaNacimiento: Date,
    ) => {
        const fechaNacimiento_t = fechaNacimiento.getTime();
        const resp = await startModificarComprador({
            nombre,
            apellido,
            telefono,
            fechaNacimiento_t,
        });
        if (resp){
            alert(`Datos actualizados con exito!`);    
            navigation.navigate("Home"); 
        } 
        
    };

    return { handleModificarComprador }
}
