

var my_news = [
    {
        author: "Лори",
        text: "Я милашка",
        bigText: "Дима сегодня сказал примерно миллиард раз, что я милашка, сижу вот улыбаюсь тута)))))"
    },
    {
        author:'Влад Кудашов',
        text : "я создаю ботов, и не только..",
        bigText:"Боты, боты-друзья, боты-полельники, боты для издевок, и еще много других электронных компаньонов могу Вам предложить"
    },
    {
        author:"Никитосик",
        text: "Завещаю всем Никитосикам: выше носики",
        bigText:"Ла-ла-ла-ла! Тебе все мало! Выше носик! Я – НИКИТОСИК! Ла-ла-ла-ла! Тебе все мало! Выше носик! Я – НИКИТОСИК!"
    },
    {
        author: "Леха",
        text:"вот тут мой порш: http://localhost:3000",
        bigText: "скажу тебе вот что - твой статус, бабки для меня ничто. Если ты собой хорош - мне плевать, Есть порш? Я скажу тебе вот что - твой статус, бабки для меня ничто. Если ты собой хорош, Леш, а где твой порш?"
    }
];

var App = React.createClass({
    render:function(){
        return (
            <div className = "app">
                <h3> Новости </h3>
            <News data = {my_news}/>
            </div>
        );
    }
});


var Article = React.createClass({
    propTypes :{
        data: React.PropTypes.shape({
            author : React.PropTypes.string.isRequired,
            text : React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },

    getInitialState:function(){
        return{
            visible: false,
        };
    },

    readmoreClick: function(e){
        e.preventDefault();
        this.setState({visible:true});
    },

    render:function(){
        var author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;

            console.log('render', this);
        return(
            <div className = 'article'>
                <p className = 'news__author'> {author}:</p>
                <p className = 'news__text'> {text}</p>
                <a href = '#' className = {'news__readmore ' + (visible ? "none" : "") } onClick = {this.readmoreClick}>Подробнее</a>
                <p className = {'news__bit-text ' + (visible ? "" : "none")}>{bigText}</p>
            </div>
        )
    }
});

var News = React.createClass({
    propTypes: {
        data:React.PropTypes.array.isRequired
    },
    getInitialState: function(){
        return{
            counter:0
        }
    },

    onTotalNewsClick:function(){
        this.setState({counter: ++this.state.counter});
    },

    render:function(){
        var data = this.props.data;

        if (data.length>0) {
            var newsTemplate = data.map(function(item,index){
            return(
                <div key ={index}>
                   <Article data = {item} />
                </div>
            )
        });
        } else {
            newsTemplate = <p>К сожалению, новостей НЕМА</p>
        }

        return (
        <div className = 'news'>
            {newsTemplate}
            <strong className = { 'news__count ' + (data.length>0 ? '' : 'none')}
            onClick = {this.onTotalNewsClick}>
             Всего новостей: {data.length}
             </strong>
        </div>
        );
    }
});


ReactDOM.render(
    //React.createElement('h1', null, 'Hi everybody'),
    <App />,
    document.getElementById('root')
);
