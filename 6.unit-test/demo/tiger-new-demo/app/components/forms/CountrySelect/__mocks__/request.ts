export function getCountry() {
    // console.log('get country code mock');

    return Promise.resolve([
        { name: 'A', numericCode: '80' },
        { name: 'B', numericCode: '81' },
        { name: 'C', numericCode: '82' }
    ]);
}

export function isMock() {}
