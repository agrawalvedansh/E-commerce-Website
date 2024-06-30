import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
export const connectDB = (uri) => {
    mongoose.connect(uri, {
        dbName: "ECommerceApp",
    }).then((c) => {
        console.log(`DB connected to ${c.connection.host}`);
    })
        .catch((e) => console.log(e));
};
export const invalidatesCache = ({ product, order, admin, userId, orderId, productId }) => {
    if (product) {
        const productKeys = ["latest-product", "categories", "all-products"];
        if (typeof (productId) == "string")
            productKeys.push(`product-${productId}`);
        else if (typeof (productId) == "object")
            productId.forEach(i => productKeys.push(`product-${i}`));
        myCache.del(productKeys);
    }
    if (order) {
        const orderKeys = ["all-orders", `my-orders-${userId}`, `order-${orderId}`];
        myCache.del(orderKeys);
    }
    if (admin) {
        myCache.del(['admins-stats', "admin-pie-chart", "admin-bar-charts", "admin-line-charts"]);
    }
};
export const reduceStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product)
            throw new Error('Product not found');
        product.stock -= order.quantity;
        await product.save();
    }
};
export const calculatePercentage = (thisMonth, lastMonth) => {
    if (lastMonth == 0)
        return thisMonth * 100;
    const percent = (thisMonth / lastMonth) * 100;
    return Number(percent.toFixed(0));
};
export const getChartData = ({ length, docArr, today, property }) => {
    const data = new Array(length).fill(0);
    docArr.forEach((i) => {
        const creationDate = i.createdAt;
        const monthDifference = (today.getMonth() - creationDate.getMonth() + 12) % 12;
        if (monthDifference < length)
            data[length - monthDifference - 1] += property ? i[property] : 1;
    });
    return data;
};
