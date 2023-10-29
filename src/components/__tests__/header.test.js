import Header from "../Header";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../Utils/store";
import { StaticRouter } from "react-router-dom/server";

test("render logo on loading header", () => {
    const header = render(
        <StaticRouter>
            <Provider store={store}>
                <Header />
            </Provider>
        </StaticRouter>
    );
    // console.log(header);
    const logo = header.getAllByTestId("logo");
    // console.log(logo[0]);

    expect(logo[0].src).toBe("http://localhost/dummy.png");

});

test("online status on loading header", () => {
    const header = render(
        <StaticRouter>
            <Provider store={store}>
                <Header />
            </Provider>
        </StaticRouter>
    );
    const onlineStatus = header.getAllByTestId("online-status");
    // console.log(onlineStatus[0]);

    expect(onlineStatus[0].innerHTML).toBe("✅");   //tick was showing in children so we used innerHTML for this, not src
});



test("Cart should have 0 items on loading header", () => {
    const header = render(
        <StaticRouter>
            <Provider store={store}>
                <Header />
            </Provider>
        </StaticRouter>
    );
    const cartItems = header.getByTestId("cartItems");
    console.log(cartItems.innerHTML);

    expect(cartItems.innerHTML).toBe("Cart - 0");   //tick was showing in children so we used innerHTML for this, not src
});