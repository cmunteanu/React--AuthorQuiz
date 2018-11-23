import React from 'react';
import './AddAuthorForm.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AuthorForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp: ''
        };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }

    onFieldChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    handleAddBook(event){
        event.preventDefault();
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        });
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <div className="AddAuthorForm__input">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={this.state.name} onChange={this.onFieldChange} />
            </div>
            <div className="AddAuthorForm__input">
                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" id="imageUrl" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} />
            </div>
            <div className="AddAuthorForm__input">
                <label htmlFor="bookTemp">Books</label>
                {this.state.books.map((book) => <p key={book}>{book}</p>)}
                <input type="text" id="bookTemp" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange} />
                <input type="button" value="+" onClick={this.handleAddBook} />
            </div>
            <input type="submit" value="Add author" />
        </form>;
    }
}

function AddAuthorForm({match, onAddAuthor}) {
    return <div className="AddAuthorForm">
        <h1>Add author</h1>
        <AuthorForm onAddAuthor={onAddAuthor} />
    </div>
}

function mapDispatchToProps(dispath, props){
    return {
        onAddAuthor: (author) => {
            dispath({type: 'ADD_AUTHOR', author});
            props.history.push('/');
        }
    };
}

export default withRouter(connect(() => {return {}}, mapDispatchToProps)(AddAuthorForm));