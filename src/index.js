import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/mark_twain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The adventures of Huckleberry Finn',
                'Life on the Missisipi',
                'Roughing it']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/mark_twain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Macbeth', 'A midnight summer\'s dream', 'Richard III']
    }
];

function getTurnData(authors) {
    const allBooks = authors.reduce(function(p, c, i){
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => author.books.some((title) => title === answer))
    }
}

const state = {
    turnData: getTurnData(authors),
    highlight: 'incorrect'
};


function onAnswerSelected(answer) {
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? "correct" : "incorrect";
    render();
}

function render() {
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}/>, document.getElementById('root'));
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
