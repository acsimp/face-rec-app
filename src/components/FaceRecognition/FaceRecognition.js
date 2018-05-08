import React from 'react';

const FaceRecognition = ({imageURL}) => {
    return (
        <div className='center na'>
            <div className='absolue mt2'>
                <img id='inputimage' src={imageURL} alt='' width='500px' height='auto'/>
            </div>    
        </div>
    );
};

export default FaceRecognition;