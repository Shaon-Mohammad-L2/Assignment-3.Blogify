"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routers = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/',
        route: (req, res) => {
            res.send('I am Active');
        }
    }
];
moduleRoutes.forEach(route => {
    routers.use(route.path, route.route);
});
exports.default = routers;
