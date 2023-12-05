import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps={
        country:"in",
        pageSize:5,
        category:'general'
    }
    static propsTypes={
        country :PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
    articles= [
        {
            "source": {
                "id": "engadget",
                "name": "Engadget"
            },
            "author": "Jeff Dunn",
            "title": "The best Black Friday TV deals still available: Get up to $750 off OLED sets from LG and Samsung",
            "description": "If you live in the US, Black Friday rivals only the weeks leading up to the Super Bowl when it comes to TV deals. If you've been thinking about upgrading from an aging set, or you have a new space that you want to fill with a massive 75-inch screen, you're in…",
            "url": "https://www.engadget.com/the-best-black-friday-tv-deals-still-available-get-up-to-750-off-oled-sets-from-lg-and-samsung-181020692.html",
            "urlToImage": "https://s.yimg.com/ny/api/res/1.2/bi3r4LJS93vKFzt5dvQz2A--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU-/https://s.yimg.com/os/creatr-uploaded-images/2023-11/2c748730-8974-11ee-abfb-3ab8a18a4f97",
            "publishedAt": "2023-11-25T18:10:20Z",
            "content": "If you live in the US, Black Friday rivals only the weeks leading up to the Super Bowl when it comes to TV deals. If you've been thinking about upgrading from an aging set, or you have a new space th… [+17104 chars]"
        },
        {
            "source": {
                "id": "wired",
                "name": "Wired"
            },
            "author": "Brenda Stolyar",
            "title": "60 Best Apple Black Friday Deals (2023): iPad, Apple Watch, AirPods",
            "description": "Our favorite iPads, Apple Watches, MacBooks, and MagSafe iPhone accessories are all on sale for Black Friday.",
            "url": "https://www.wired.com/story/best-apple-black-friday-deals-2023-3/",
            "urlToImage": "https://media.wired.com/photos/6552de6e2f7d6c2077b045ce/191:100/w_1280,c_limit/Best%20Apple%20Deals.jpg",
            "publishedAt": "2023-11-25T22:16:18Z",
            "content": "It's the best time of year to buy Apple hardware, whether that's a new iPad, MacBook, Apple Watch, or even a MagSafe iPhone casewe've found plenty of Apple Black Friday deals right now. For more gadg… [+28821 chars]"
        },
        {
            "source": {
                "id": "wired",
                "name": "Wired"
            },
            "author": "Eric Ravenscraft",
            "title": "26 Best Black Friday Laptop Deals (2023): Windows, MacBooks, Chromebooks",
            "description": "Whether you need it for work, school, or gaming, you can snag a great computer right now with these Black Friday laptop deals.",
            "url": "https://www.wired.com/story/best-black-friday-laptop-deals-2023-1/",
            "urlToImage": "https://media.wired.com/photos/6556cb5a8d6138db7e351b6d/191:100/w_1280,c_limit/Black-Friday-Cyber-Monday-Best-Laptop-Deals-2.jpeg",
            "publishedAt": "2023-11-25T12:53:03Z",
            "content": "Black Friday usually brings a ton of sales on every knick-knack and doodad you probably don't need, but good laptop deals are one of the gems of this season. You'll rarely get a better chance to nab … [+11237 chars]"
        }
    ]
    constructor (){
        super();
        console.log("Hello I am a constructor");
        this.state={
            articles:this.articles,
            loading:false,
            page:1
        }
    }

    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2c419772e59f4cbe864eefd8e8ea7916&page=1&pagesize=${this.props.pagesize}`
        this.setState({loading:true})
        let data =await fetch (url);
        let parsedData =await data.json()
        console.log(parsedData);
        this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    }
    handlePreClick =async()=>{
        console.log("Pre");
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2c419772e59f4cbe864eefd8e8ea7916&page=${this.state.page-1}&pagesize=${this.props.pagesize}`
        this.setState({loading:true})
        let data =await fetch (url);
        let parsedData =await data.json()
        console.log(parsedData);
        this.setState({articles:parsedData.articles})
        this.setState({
            page:this.state.page-1,
            loading:false
        })
    }
    handleNextClick = async()=>{
        console.log("Next");
        if (!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize))){
            let url=`
            https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2c419772e59f4cbe864eefd8e8ea7916&page=${this.state.page+1}&pagesize=${this.props.pagesize}`
            this.setState({loading:true})
            let data =await fetch (url);
            let parsedData =await data.json()
            console.log(parsedData);
            this.setState({articles:parsedData.articles})
            this.setState({
                page:this.state.page+1,
                loading:false
            })
        
        }

    }

  render() {
    return (
      <div className='container my-3'>
        <h2>This is Top 5 Headling From all Over Of The World</h2>
        {this.state.loading && <Spinner/>}
        <div className='row'>
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className='col-md-4' key ={element.url}>
                    <NewsItem title={element.title?element.title.slice(0,45):" "} description={element.description?element.description.slice(0,88):" "} imageUrl={element.urlToImage} newsurl={element.url} />

                </div>
            })}
        </div>
        <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
        <button disabled={(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        
      </div>
    )
  }
}

export default News
