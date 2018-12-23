import React, { Component } from "react";
import "./App.css";
import Product from "./Product";
import axios from "axios";
import { HOST } from '../constants';

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      selectedProduct: null,
    };
  }

  componentWillMount() {
    var url = HOST + `/api/inventory/products`;
    axios.get(url).then(response => {
      this.setState({ products: response.data });
    });
  }

  handleSelectProduct = product => {
    this.setState({
      selectedProduct: product,
    });

    this.props.onSelect(product);
  };

  handleEditProduct = editProduct => {
    throw new Error(`Not implemented`)
  };

  renderProducts = products => {
    if (products.length === 0) {
      return <tr><td>No products</td></tr>;
    } else {
      return products.map((product, index) => (
        <Product key={index} {...product}
          isEditable={false}
          isSelectable={true}
          onEditProduct={this.handleEditProduct}
          onSelectProduct={this.handleSelectProduct} />
      ));
    }
  };

  render() {
    const { products } = this.state;

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity on Hand</th>
            <th />
          </tr>
        </thead>
        <tbody>{this.renderProducts(products)}</tbody>
      </table>
    );
  }
}

export default Inventory;
