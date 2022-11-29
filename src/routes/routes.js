

'use-strict';
const routes = require('express').Router();
const global = require('../handlers/globalHandler')
const globalHandler = new global();

routes.get('/viewProducts', (req, res) => {
    globalHandler.viewProducts(req, res);
});

//store end points
routes.post('/addStoreRequest', (req, res) => {
    globalHandler.addStoreRequest(req, res);
});

routes.get('/fetchStoreRequests', (req, res) => {
    globalHandler.fetchStoreRequests(req, res);
});
routes.post('/acceptStoreRequest', (req, res) => {
    globalHandler.acceptStoreRequest(req, res);
});
routes.post('/rejectStoreRequest', (req, res) => {
    globalHandler.rejectStoreRequest(req, res);
});

//supplier api endpoints
routes.post('/addSuppliesRequest', (req, res) => {
    globalHandler.addSuppliesRequest(req, res);
});
routes.get('/fetchSuppliesRequests', (req, res) => {
    globalHandler.fetchSuppliesRequests(req, res);
});
routes.post('/acceptSuppliesRequest', (req, res) => {
    globalHandler.acceptSuppliesRequest(req, res);
});
routes.post('/rejectSuppliesRequest', (req, res) => {
    globalHandler.rejectSuppliesRequest(req, res);
});


//adding warehouses suppiers and stores
routes.post('/addStores', (req, res) => {
    globalHandler.addStores(req, res);
});
routes.post('/addSuppliers', (req, res) => {
    globalHandler.addSuppliers(req, res);
});
routes.post('/addWarehouses', (req, res) => {
    globalHandler.addWarehouses(req, res);
});
// routes.get('/fetch')
module.exports = routes;
