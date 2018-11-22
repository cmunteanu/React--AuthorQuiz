import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter() });

const state = {
  turnData : {
    books: ['book 1', 'book 2', 'book 3', 'book 4'],
    author: {
      name: 'AUTHOR',
      imageUrl: 'images/authors/Koala.jpg',
      imageSource: 'wiki',
      books: ['book 1']
    }
  },
  highlight: 'none'
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("When no answer has been selected", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}} />);
  });

  it ("should have no background color", () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
  });
});

describe("When wrong answer has been selected", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={() => {}} />);
  });

  it ("should have red background color", () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
  });
});

describe("When correct answer has been selected", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={() => {}} />);
  });

  it ("should have green background color", () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
  });
});

describe("When the first answer is selected", () => {
  let wrapper;

  const handleAnswerSelected = jest.fn();
   
  beforeAll(() => {
    wrapper = mount(
      <AuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={handleAnswerSelected} />
    );
    wrapper.find('.answer').first().simulate('click');
  });

  it ("onAnswerSelected function should be called", () => {
    expect(handleAnswerSelected).toHaveBeenCalled();
  });

  it ("should receive book 1", () => {
    expect(handleAnswerSelected).toHaveBeenCalledWith('book 1');
  });
});
