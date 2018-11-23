import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/mark_twain.jpg',
        imageSource: 'wiki',
        books: [
            'Book 1 - 1',
            'Book 1 - 2',
            'Book 1 - 3',
            'Book 1 - 4'
        ]
    },
    {
        name: 'Author 2',
        imageUrl: 'images/authors/Jellyfish.jpg',
        imageSource: 'wiki',
        books: [
            'Book 2 - 1',
            'Book 2 - 2',
            'Book 2 - 3',
            'Book 2 - 4'
        ]
    },
    {
        name: 'Author 3',
        imageUrl: 'images/authors/Koala.jpg',
        imageSource: 'wiki',
        books: [
            'Book 3 - 1',
            'Book 3 - 2',
            'Book 3 - 3',
            'Book 3 - 4'
        ]
    },
    {
        name: 'Author 4',
        imageUrl: 'images/authors/Lighthouse.jpg',
        imageSource: 'wiki',
        books: [
            'Book 4 - 1',
            'Book 4 - 2',
            'Book 4 - 3',
            'Book 4 - 4'
        ]
    },
    {
        name: 'Author 5',
        imageUrl: 'images/authors/Penguins.jpg',
        imageSource: 'wiki',
        books: [
            'Book 5 - 1',
            'Book 5 - 2',
            'Book 5 - 3',
            'Book 5 - 4'
        ]
    }

];

const getTurnData = (authors) => {
    const allBooks = authors.reduce((p, c, index) => p.concat(c.books), []);

    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => author.books.some((title) => title === answer))
    };
};

function reducer(state = {authors, turnData: getTurnData(authors), highlight: ''}, action){
    switch(action.type){
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({}, state, {highlight: isCorrect ? 'correct' : 'wrong'});
        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight: '',
                turnData: getTurnData(state.authors)
            });
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {
                authors: authors.concat([action.author])
            });
        default:
            return state;
    }
}

let store = Redux.createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const AuthorWrapper = function(){
    return <ReactRedux.Provider store={store}> 
        <AddAuthorForm />
        </ReactRedux.Provider>;
};

function App() {
    return <ReactRedux.Provider store={store}> 
        <AuthorQuiz />
    </ReactRedux.Provider>;
}


ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path='/' component={App} />
            <Route path='/add' component={AuthorWrapper} />
        </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
