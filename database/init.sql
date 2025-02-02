DROP TABLE IF EXISTS products;
CREATE TABLE products (
    id          integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title       varchar(40) NOT NULL,
    infos       varchar(40) NOT NULL
);

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
     id           integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
     product_id   integer,
    CONSTRAINT fk_products
        FOREIGN KEY(product_id) 
	        REFERENCES products(id)
);

INSERT INTO products(title, infos) VALUES ('My title', 'My infos');