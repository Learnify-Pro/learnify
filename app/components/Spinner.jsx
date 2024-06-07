import React from 'react'
import { ImSpinner8 } from 'react-icons/im'

const Spinner = () => {
    return (
        <div>
            <div className="flex justify-center items-center gap-2 w-full">
                <ImSpinner8 className="text-2xl animate-spin text-blue-600" />
                <h4>Loading...</h4>
            </div>
        </div>
    )
}

export default Spinner
