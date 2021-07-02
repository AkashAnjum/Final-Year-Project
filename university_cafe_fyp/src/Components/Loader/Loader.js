import React from 'react';
import "../../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


const Loading = () => {
    return (
        <div align='center'>
            <Loader
                type="MutatingDots"
                color='rgb(125, 200, 15)'
                secondaryColor='rgb(255,40,10) '
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
        </div>
    )
}

export default Loading;