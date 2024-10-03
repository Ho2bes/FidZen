// src/components/Products.js
import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, ScrollView, Text } from 'react-native';
import { getProducts, addProduct } from '../api/products.api';

const Products = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      await addProduct({ name, code, price, receiptId: '123' });
      setName('');
      setCode('');
      setPrice('');
    } catch (error) {
      console.error('Erreur lors de l’ajout du produit', error);
    }
  };

  return (
    <ScrollView>
      <TextInput value={name} onChangeText={setName} placeholder="Nom du produit" />
      <TextInput value={code} onChangeText={setCode} placeholder="Code du produit" />
      <TextInput value={price} onChangeText={setPrice} placeholder="Prix" />
      <Button title="Ajouter le produit" onPress={handleAddProduct} />

      {products.map((product) => (
        <View key={product.id}>
          <Text>{product.name}</Text>
          <Text>Code: {product.code}</Text>
          <Text>Prix: {product.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Products;
