import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';

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

let state = resetState();

const onAnswerSelected = (answer) => {
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    console.log(state.highlight);
    render();
}

const AuthorWrapper = withRouter(({history}) => {
    return <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');
    }} />
});

function App() {
    return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} onContinue={() => {
        state = resetState();
        render();
    }} />;
}

function resetState(){
    return {
        turnData: getTurnData(authors),
        highlight: 'none'
    };
}

function render() {
    ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path='/' component={App} />
                <Route path='/add' component={AuthorWrapper} />
            </React.Fragment>
        </BrowserRouter>,
        document.getElementById('root'));
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
