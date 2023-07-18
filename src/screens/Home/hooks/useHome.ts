import { useEffect, useState } from "react";
import { ModalSucursalProps } from "../components/ModalSucursal";
import { ModalCatProps } from "../components/ModalCategorias";
interface Product {
    id: string,
    nombre: string,
    imagen: string,
    precio: number,
    eliminado: boolean,
    categoriaId: number,
    stock: number,
    precioDescuento: null,
    aplicaDescuento: null,
    descripcion: string
    cantidad: number,
}
export const useHome = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedName, setSelectedName] = useState<string | undefined>();// el numero
    const [selectedNameSuc, setSelectedNameSuc] = useState('');// el nombre string

    const [selectedCatId, setSelectedCatId] = useState<number | null>(null);// el numero

    const [searchQuery, setSearchQuery] = useState('');
    const [isCatVisible, setIsCatVisible] = useState(false);
    const [visibleSuc, setVisibleSuc] = useState(false);
    const [productsIsLoading, setProductsIsLoading] = useState(true);
    const modalSucursalProps: ModalSucursalProps = {
        selectedName: selectedName,
        setSelectedName: setSelectedName,
        setSelectedNameSuc: setSelectedNameSuc,
        visible: visibleSuc,
        setVisible: setVisibleSuc
    };

    const modalCatProps: ModalCatProps = {
        categorias: [],
        product: null,
        isVisible: isCatVisible,
        setVisible: setIsCatVisible,
        selectedCategory: selectedCatId,
        setSelectedCategory: setSelectedCatId,
    };

    useEffect(() => {
        setProductsIsLoading(true);

        selectedName && fetch(`http://super5-391418.rj.r.appspot.com/api/producto/obtenerPorSucursal/${selectedName}`)
            .then(response => response?.json())
            .then(data => {
                const filteredProducts = data.filter((product: Product) =>
                    (product.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
                    (product.descripcion?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
                );
                setProducts(filteredProducts);
                setProductsIsLoading(false);
            })
            .catch(error => console.error(error));
    }, [selectedName, searchQuery]);

    const handleFilterIconPress = () => {
        setIsCatVisible(true);
    };


    const filteredProducts = selectedCatId
        ? products.filter(product => product.categoriaId === selectedCatId)
        : products;

    const handlePressSucursal = () => {
        setVisibleSuc(true);
    };
    return {
        handlePressSucursal,
        filteredProducts,
        handleFilterIconPress,
        modalCatProps,
        modalSucursalProps,
        selectedNameSuc,
        searchQuery,
        setSearchQuery,
        productsIsLoading,
    };
};

