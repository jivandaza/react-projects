import React, {useContext} from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Context from "../../context";
import ROLE from "../../common/role";

const UserAuthProtected = ({children}) => {
    const user = useSelector(state => state?.user?.user);
    const { isLoading } = useContext(Context);

    if ( user ) {
        if ( user?.role === ROLE.GENERAL )
            return <Navigate to={'/'} replace />;
        if ( user?.role === ROLE.ADMIN )
            return <Navigate to={'/admin-panel/productos'} replace />;
    }

    return (
        isLoading ? (
            <div className='mx-auto container p-4 min-h-[80vh] flex items-center justify-center'>
                <span className='loader'></span>
            </div>
        ) : (
            children
        )
    );
};

export default UserAuthProtected;