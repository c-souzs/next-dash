import React from 'react';
import { GlobalCtx } from '../../contexts/Global';

import classNames from 'classnames';

const ProfileAside = () => {
    const { showAside } = React.useContext(GlobalCtx);

    return (
        <div className='p-2'>
            <p className={classNames('text-sm text-white-50 font-medium mb-1', {'hidden': !showAside})}>Deslogar:</p>
            <button
                className='w-full flex items-end justify-center text-sm font-medium text-white-50 gap-2 p-2 py-1 rounded border border-black-700'
            >
                {showAside && 'Caio Souza'}
            </button>
        </div>
    )
}

export default ProfileAside;