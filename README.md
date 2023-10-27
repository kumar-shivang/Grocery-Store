# Grocery Store
This is a simple grocery app. It uses [Grocery Store API](github.com/kumar-shivang/Grocery-Store-API) in the backend.
It is created using [VueJS](https://vuejs.org/) and [Vuetify](https://vuetifyjs.com/).
It also has PWA support.

## Features
### User Features
- [x] User can register and login.
- [x] User can add items to cart.
- [x] User can checkout.
- [x] User can view order history.

### Admin Features
- [x] Admin can approve manager requests.
- [x] Admin can add, update and delete item categories.

### Manager Features
- [x] Manager can add, update and delete items.
- [x] Manager can request admin for adding, updating and deleting item categories.
- [x] Manager can view their dashboard.

## Project Setup
### Clone the repository
```shell
git clone htttps://github.com/kumar-shivang/Grocery-Store.git
cd Grocery-Store
```
### Install Dependencies

```sh
npm install
```
### Generate PWA Assets

```sh
 pwa-assets-generator -p minimal  ./src/assets/logo.svg
```

### Build for Production

```sh
vite build
```


### Compile and Hot-Reload for Development

```sh
vite
```

