export interface Token {
  rol: "admin" | "sucursal" | "comprador";
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  imagenUrl: string;
  usuario: string;
  uid: string;
  iat: number;
  exp: number;
  sub: string;
}
  
  export interface Direccion {
    id: string;
    direccion: string;
    ciudad: string;
    departamento: string;
    longitud: string;
    latitud: string;
    aclaracion: string;
    
  }
  

  export interface Categorias {
    id: number;
    name: string;
  }
  
  export interface Sucursal {
    id: string;
    nombre: string;
    direccion: Direccion;
  }
  export interface Producto {
    id: string;
    nombre: string;
    imagen: string;
    precio: number;
    eliminado: boolean;
    categoriaId: number;
    stock: number;
    precioDescuento: number | null;
    aplicaDescuento: boolean;
    descripcion: string;
  }
  export interface CarritoItem {
    producto: Producto;
    cantidad: number;
  }
  
  export interface CarritoDto {
    producto_id: number;
    cantidad: number;
  }
  
  export interface CompraDTO {
    formaEntrega: string;//"DOMICILIO" | "SUCURSAL";
    direccion_id?: number;
    sucursal_id: number;
    carrito: CarritoDto[];
    id?: number;
    estado?: "PENDIENTE" | "PAGO" | "CANCELADO" | "CONFIRMADO" | "FINALIZADO";
    eliminado?: boolean;
    fechaCompra?: Date;
    fechaConfirmacion?: Date;
    fechaCancelacion?: Date;
    fechaFinalizacion?: Date;
    codigoPayPal?: string;
    precio?: number;
    comprador_id?: number;
    promocion_id?: number;
    urlPaypal?: string;
  }

  export interface UserDataProps {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    fechaNacimiento: Date;
    rol: 0 | 1;
    eliminado: 0 | 1;
    bloqueado: 0 | 1;
    usuario: string;
    direcciones: Direccion[];
  }

  export interface ReclamoDTO {
    id?: number;
    tipo: string;
    estado: "ATENDIDO" | "CREADO";
    comentario: string;
    comentarioSucursal?: string;
    venta: {
      id: number;
    };
  }