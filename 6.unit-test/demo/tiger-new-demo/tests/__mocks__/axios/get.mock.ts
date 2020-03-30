import API from 'utils/API';

export default jest.fn(async (url /* , config*/) => {
    console.log('from axios mock');

    switch (url) {
        case API.COUNTRY.all():
            return [
                { name: 'A', numericCode: '80' },
                { name: 'B', numericCode: '81' },
                { name: 'C', numericCode: '82' }
            ];
        default:
            throw new Error('Not mock');
    }
});
