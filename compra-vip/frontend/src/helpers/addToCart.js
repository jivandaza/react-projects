import { setUserDetails } from "../store/userSlice";
import summaryApi from "../common";
import toastr from "toastr";

const addToCart = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    const response = await fetch(summaryApi.addProductToCart.url, {
        method: summaryApi.addProductToCart.method,
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            productId: id
        })
    });

    const { message, success, error } = await response.json();

    if ( success )
        toastr.success(message);

    if ( error )
        toastr.info(message);
};

export default addToCart;