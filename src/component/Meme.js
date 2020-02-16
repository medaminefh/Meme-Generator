import React,{Component} from 'react' ;

class Meme extends Component {
    constructor(props) {
        super(props);
        this.state= {
            topText:'',
            bottomText:'',
            randomImg:'http://i.imgflip.com/1bij.jpg',
            AllImg:[]
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const {name , value } = event.target
        this.setState(prev => {
            return {
                [name]:value
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const randomNum = Math.floor(Math.random() * this.state.AllImg.length)
        const url = this.state.AllImg[randomNum].url
        this.setState({
            randomImg:url
        })
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => {
                const {memes} = data.data
                this.setState(prev => {
                    return {
                        AllImg:memes
                    }
                })
            })
    }

    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                        autoComplete='off'
                    /> 
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                        autoComplete='off'
                    /> 
                
                    <button type='submit'>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default Meme