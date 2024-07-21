import { objectType, extendType, nonNull, floatArg, stringArg } from "nexus";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Context } from "../types/Context";
import { NexusGenObjects } from "../../nexus-typegern";

export const ProductType = objectType({
    name: "Product",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.nonNull.float("price");
        t.nonNull.int("creatorId");
        t.field("createdBy", {
            type: "User",
            resolve(parent, _args, _context): Promise<User | null> {
                return User.findOne({ where: { id: parent.creatorId } });
            },
        });
    },
});

let products: NexusGenObjects["Product"][] = [
    {
        id: 1,
        name: "Product 1",
        price: 69.99,
    },
    {
        id: 2,
        name: "Product 2",
        price: 13.23,
    },
];

export const ProductsQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("products", {
            type: "Product",
            resolve(_parent, _args, context: Context, _info): Promise<Product[]> {
                //return Product.find()
                const { dbconn } = context;
                return dbconn.query(`select * from product`)

            },
        });
    },
});

export const CreateProductMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createProduct", {
            type: "Product",
            args: {
                name: nonNull(stringArg()),
                price: nonNull(floatArg()),
            },
            resolve(_parent, args, _context, _info): Promise<Product> {
                const { name, price } = args;
                // console.log(products);
                return Product.create({ name, price }).save();
            },
        });
    },
});