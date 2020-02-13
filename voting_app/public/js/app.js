
class Product extends React.Component {

  /*
  constructor(props) {
    super(props); // always call this first

    // custom method bindings here
    this.handleUpVote = this.handleUpVote.bind(this);
  }

  handleUpVote() {
    this.props.onVote(this.props.id);
  }
  */
 
  // With this ES6 arrow function syntax, we can remove contructor()  
  // since there is no need to manual binding call
  handleUpVote = () => {
    this.props.onVote(this.props.id);
  }

  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon" />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img className="ui avatar image" src={this.props.submitterAvatarUrl} />
          </div>
        </div>
      </div>
    );
  }
}

class ProductList extends React.Component {

  /*
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };

    this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }

  handleProductUpVote(productId) {
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        // clone the original into a new object and then modify the votes property on that new object.
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });

    this.setState({ products: nextProducts });
  }
  */

  state = {
    products: [],
  };

  handleProductUpVote = (productId) => {
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        // clone the original into a new object and then modify the votes property on that new object.
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });

    this.setState({ products: nextProducts });
  }

  // componentDidMount is a React lifecycle method
  componentDidMount() {
    // modifying this.state outside of setState() is bad practice
    // setState() is actually asynchronous
    this.setState({ products: Seed.products });
  }

  render() {

    const products = this.state.products.sort((a, b) => (
      b.votes - a.votes
    ));

    const productComponents = products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));
    
    return (
      <div className="ui unstackable items">
        {productComponents}
      </div>
    );
  }
}


ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);