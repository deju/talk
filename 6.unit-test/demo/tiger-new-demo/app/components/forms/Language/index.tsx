import React, { useState } from 'react';
import { language } from 'utils/i18n';
import { getRandom } from './util';

export default function Language() {
    const [random] = useState(getRandom());

    // const random = getRandom();
    return (
        <div>
            {language} - {random}
        </div>
    );
}
