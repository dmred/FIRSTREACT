

var my_news = [
    {
        author: "Лори",
        text: "Я не дура"
    },
    {
        author:'Влад Кудашов',
        text : "я создаю ботов, и не только.."
    },
    {
        author:"Никитосик",
        text: "Завещаю всем Никитосикам: выше носики"
    },
    {
        author: "Леха",
        text:"вот тут мой порш: http://localhost:3000"
    }
];

var Article = React.createClass({
    render:function(){
        var author = this.props.data.author, 
            text = this.props.data.text;
        return(
            <div className = 'article'>
                <p className = 'news__author'> {author}:</p>
                <p className = 'news__text'> {text}</p>
            </div>
        )
    }
});

var App = React.createClass({
    render:function(){
        return (
            <div className = "app">
                <h3> Новости </h3>
            <News data = {my_news} />
            </div>
        );
    }
});


var News = React.createClass({
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
            <strong className = { 'news__count ' + (data.length>0 ? '' : 'none')}> Всего новостей: {data.length} </strong>
        </div>
        );
    }
});


ReactDOM.render(
    //React.createElement('h1', null, 'Hi everybody'),
    <App />,
    document.getElementById('root')
);

alert(kik.length>0);