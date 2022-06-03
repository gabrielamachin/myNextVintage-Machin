const products = [
    { id: '1', name: 'Pantalón de jean', price: 1500, category: 'Pantalones', img:'https://www.long-john.nl/wp-content/woodypicas/levis-jeans-long-john-blog-vintage-button-16-original-usa-faded-fadedjeans-fadeddenim-bige-big-e-red-tab-redtab-washed-out-worn-out-old-levi-strauss-denimcollector-verzamelaar-2.jpg', stock: 1, description:'Jean reciclado 100% algodón'},
    { id: '2', name: 'Remera mangas cortas', price: 300, category: 'Remeras y camisas', img:'https://images.squarespace-cdn.com/content/v1/5632062ae4b056714fc0a063/1613921423518-MFINYVLHNZUIFBOK8AKA/WHITE%2BT%2BJ.jpg?format=1500w', stock: 2, description:'Remera estilo 80s mangas cortas'},
    { id: '3', name: 'Mochila', price: 800, category: 'Accesorios', img:'https://cdn11.bigcommerce.com/s-h7ug7/images/stencil/500x659/products/4211/29390/Screen_Shot_2020-09-03_at_11.49.24_AM__80800.1599151789.png?c=2', stock: 1, description:'Mochila sin uso'}
]

export const getProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products)
        }, 2000)
    })
} 