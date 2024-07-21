"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const nexus_1 = require("nexus");
exports.UserType = (0, nexus_1.objectType)({
    name: "User",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("username");
        t.nonNull.string("email");
        t.nonNull.string("password");
        // t.nonNull.list.nonNull.field("products", {
        //   type: "Product",
        //   resolve(parent, _args, _context): Promise<Product[]> {
        //     return Product.find({ where: { id: parent.id } });
        //   },
        // });
    },
});
