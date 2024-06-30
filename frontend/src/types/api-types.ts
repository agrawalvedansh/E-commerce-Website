import { Product, User, cartItem, orderType, shippingInfo } from "./types";

export type CustomError = {
    status: number;
    data: {
        message: string;
        success: boolean;
    };
};

export type messageResponse = {
    success: boolean;
    message: string;
}

export type allUsersResponse = {
    success: true;
    users: User[];
}

export type userResponse = {
    success: true;
    user: User;
}

export type allProductsResponse = {
    success: boolean;
    products: Product[];
}

export type categoriesResponse = {
    success: boolean;
    categories: string[];
}

export type searchProductResponse = {
    success: boolean;
    products: Product[];
    totalPage: number;
}

export type productResponse = {
    success: boolean;
    product: Product;
}

export type allOrdersResponse = {
    success: boolean;
    orders: orderType[];
}

export type orderDetailsResponse = {
    success: boolean;
    order: orderType;
}

export type searchProductRequest = {
    price: number;
    page: number;
    category: string;
    search: string;
    sort: string;
}


export type newProductRequest = {
    id: string;
    formData: FormData;
}

export type updateProductRequest = {
    userId: string
    productId: string;
    formData: FormData;
}


export type deleteProductRequest = {
    userId: string
    productId: string;
}

export type newOrderRequest = {
    shippingInfo: shippingInfo;
    orderItems: cartItem[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    user: string;
}

export type updateOrderRequest = {
    userId: string;
    orderId: string;
}

export type deleteUserRequest = {
    userId: string;
    adminUserId: string;
}

