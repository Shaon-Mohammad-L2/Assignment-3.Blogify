"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const blog_model_1 = require("./blog.model");
// create a blog.
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.create(payload);
    return result;
});
// get all blogs
const getAllBlogsFromDB = (qurery) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.find();
    return result;
});
// get single blog
const getSingleBlogFrom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findById(id);
    return result;
});
//update a blog.
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, { payload });
    return result;
});
// delete a blog
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findByIdAndDelete(id);
    return result;
});
exports.BlogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    getSingleBlogFrom,
    updateBlogIntoDB,
    deleteBlogFromDB
};
