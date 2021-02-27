import supertest from 'supertest';
import App from '../src/App';

const Request = supertest(App);

export default Request;
