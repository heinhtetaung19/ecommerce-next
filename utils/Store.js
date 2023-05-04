import { createContext, useReducer, useContext } from "react";
import Cookies from "js-cookie";

const cart = Cookies.get("cart");

const initialState = {
    cart: (() => {
        try {
            if (cart) {
                const parsedCart = JSON.parse(cart);
                return parsedCart;
            } else {
                return { cartItems: [], shippingAddress: {} };
            }
        } catch (error) {
            console.error(error);
            return { cartItems: [], shippingAddress: {} };
        }
    })(),
};

const setCookies = (state, cartItems) =>
    Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));

const Store = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "CART_ADD_ITEM": {
            const newItem = action.payload;
            const existedItem = state.cart.cartItems.find(
                item => item.slug === newItem.slug,
            );

            const cartItems = existedItem
                ? state.cart.cartItems.map(item =>
                    item.name === existedItem.name ? newItem : item,
                )
                : [...state.cart.cartItems, newItem];
            setCookies(state, cartItems);
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case "CART_REMOVE_ITEM": {
            const cartItems = state.cart.cartItems.filter(
                item => item.slug !== action.payload.slug,
            );
            setCookies(state, cartItems);
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case "INCREASE_ITEM_QUANTITY": {
            const slug = action.payload.slug;
            const cartItems = state.cart.cartItems.map(item =>
                item.slug === slug
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            );
            setCookies(state, cartItems);
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case "DECREASE_ITEM_QUANTITY": {
            const slug = action.payload.slug;
            const cartItems = state.cart.cartItems.map(item =>
                item.slug === slug
                    ? { ...item, quantity: item.quantity - 1 }
                    : item,
            );
            setCookies(state, cartItems);
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case "SAVE_SHIPPING_ADDRESS": {
            const shippingAddress = action.payload;
            Cookies.set('cart', JSON.stringify({ ...cart, cartItems: state.cart.cartItems, shippingAddress }))
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: {
                        ...state.cart.shippingAddress,
                        ...action.payload,
                    },
                },
            };
        }

        case "CLEAR_CART_ITEMS": {
            Cookies.remove("cart");
            return { ...state, cart: { ...state.cart, cartItems: [] } };
        }

        default:
            return state;
    }
};

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <Store.Provider value={value}>{children}</Store.Provider>;
};

export const useStoreContext = () => useContext(Store);
