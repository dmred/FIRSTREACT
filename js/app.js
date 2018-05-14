

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
                <Add />
                <h3> Новости </h3>
                <News data = {my_news}/>
            </div>
        );
    }
});

var Add = React.createClass({
    getInitialState: function() {
      return {
        agreeNotChecked: true,
        authorIsEmpty: true,
        textIsEmpty: true
      };
    },
    componentDidMount: function() {
      ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onBtnClickHandler: function(e) {
      e.preventDefault();
      var author = ReactDOM.findDOMNode(this.refs.author).value;
      var text = ReactDOM.findDOMNode(this.refs.text).value;
      alert(author + '\n' + text);
    },
    onCheckRuleClick: function(e) {
      this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    },
    onFieldChange: function(fieldName, e) {
      if (e.target.value.trim().length > 0) {
        this.setState({[''+fieldName]:false})
      } else {
        this.setState({[''+fieldName]:true})
      }
    },
    render: function() {
      var agreeNotChecked = this.state.agreeNotChecked,
          authorIsEmpty = this.state.authorIsEmpty,
          textIsEmpty = this.state.textIsEmpty;
      return (
        <form className='add cf'>
          <input
            type='text'
            className='add__author'
            onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
            placeholder='Ваше имя'
            ref='author'
          />
          <textarea
            className='add__text'
            onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
            placeholder='Текст новости'
            ref='text'
          ></textarea>
          <label className='add__checkrule'>
            <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
          </label>
  
          <button
            className='add__btn'
            onClick={this.onBtnClickHandler}
            ref='alert_button'
            disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}
            >
            Показать alert
          </button>
        </form>
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
            <strong className = { 'news__count ' + (data.length>0 ? '' : 'none')}>
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
