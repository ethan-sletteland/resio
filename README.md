# Take Home Store

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

Other tools include [Material UI](https://mui.com/) and dummy images from [placeholder.com](https://placeholder.com/).

I though about saving state in Firebase but decided that was overkill.

## Running the app

Run `git clone https://github.com/ethan-sletteland/resio.git`, and then enter the project directory (`/resio`)

Run `npm i` to install dependencies, then to run the app, enter: `npm start`.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Notes

The instructions said pseudo-code, but with modern frameworks why not just prototype?

Live refresh of product data is currently enabled with short-polling via a custom hook (thanks [joshwcomeau](https://www.joshwcomeau.com/snippets/react-hooks/use-interval/)!). It doesn't do much as the data is hard coded, but the logic is there, and opening the console will document the refresh calls being made.
