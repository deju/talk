import http from 'utils/http';
import API from 'utils/API';

export function getCountry() {
    console.log('getCountry');

    return http.get(API.COUNTRY.all());
}
