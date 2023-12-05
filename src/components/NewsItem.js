import React, { Component } from "react";

export class NewsItem extends Component {
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
  }
  render() {
  let {title,description,imageUrl,newsurl}=this.props
    return (
      <div>
        <div className="card" style={{width: '18rem'}}>
          <img src={!imageUrl?"https://imageio.forbes.com/specials-images/imageserve/651ea23d7782501917072f5a/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds":imageUrl} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a  rel="noopener" href={newsurl}  className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
