import Body from "../tempbody";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../Utils/store";
import { StaticRouter } from "react-router-dom/server";
import {Data} from "../../mocks/data";

global.fetch = jest.fn(()=>{
    return Promise.resolve({
        json: Promise.resolve(Data),
    });
});

test("Search results on home page" , () => {
    const body = render(
        <StaticRouter>
            <Provider store={store}>
                <Body/>
            </Provider>
        </StaticRouter>
    )
})