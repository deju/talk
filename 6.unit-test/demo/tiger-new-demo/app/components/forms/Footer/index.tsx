import React from 'react';
import security from 'stores/security';

export default function Footer() {
    return (
        <footer>
            {security?.user?.level === 1 && <div>level one</div>}
            {security?.user?.level === 2 && <div>level two</div>}
        </footer>
    );
}
