import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { allProductsResponse, categoriesResponse, deleteProductRequest, messageResponse, newProductRequest, productResponse, searchProductRequest, searchProductResponse, updateProductRequest } from "../../types/api-types";

export const productAPI = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`
    }),

    tagTypes: ["product", "allProducts"],

    endpoints: (builder) => ({

        latestProducts: builder.query<allProductsResponse, string>({
            query: () => "latest",
            providesTags: ["product"]
        }),
        allProducts: builder.query<allProductsResponse, string>({
            query: (id) => `admin-product?id=${id}`,
            providesTags: ["product"]
        }),
        categories: builder.query<categoriesResponse, string>({
            query: () => `categories`,
            providesTags: ["product"]
        }),
        searchProducts: builder.query<searchProductResponse, searchProductRequest>({
            query: ({price, search, sort, category, page}) => {
                
                let base = `all?search=${search}&page=${page}`;
                
                if(price) base+= `&price=${price}`;
                if(sort) base+= `&sort=${sort}`;
                if(category) base+= `&category=${category}`;

                return base;
            },
            providesTags: ["product"]
        }),
        productDetails: builder.query<productResponse, string>({
            query: (id) => id,
            providesTags: ["product"]
        }),
        newProducts: builder.mutation<messageResponse, newProductRequest>({
            query: ({formData, id}) => ({
                url: `new?id=${id}`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["product"]
        }),
        updateProduct: builder.mutation<messageResponse, updateProductRequest>({
            query: ({formData, userId, productId}) => ({
                url: `${productId}?id=${userId}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["product"]
        }),
        deleteProduct: builder.mutation<messageResponse, deleteProductRequest>({
            query: ({userId, productId}) => ({
                url: `${productId}?id=${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["product"]
        }),
    })
});

export const {useLatestProductsQuery, useAllProductsQuery, useCategoriesQuery, useSearchProductsQuery, useNewProductsMutation, useProductDetailsQuery, useUpdateProductMutation, useDeleteProductMutation} = productAPI;