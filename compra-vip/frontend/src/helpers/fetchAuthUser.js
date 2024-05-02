import summaryApi from "../common";
import toastr from "toastr";

const fetchAuthUser = async () => {

    const dataResponse = await fetch(summaryApi.currentUser.url, {
        method: summaryApi.currentUser.method,
        credentials: 'include'
    });

    const { failAuth, error, message, success } = await dataResponse.json();

    console.log(failAuth, error, message, success);

    if ( failAuth ) {
        toastr.info(message);
    } else if ( error ) {
        toastr.error(message);
    }

    if ( success ) {
        return true;
    }

    return false;
};

export default fetchAuthUser;