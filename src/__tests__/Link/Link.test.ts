import React from 'react';
import renderer from 'react-test-renderer';

import {Loader} from 'components/index.ts';


it('Ссылка рендерится без ошибок', () => {
    const tree = renderer
        .create(<Loader/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});