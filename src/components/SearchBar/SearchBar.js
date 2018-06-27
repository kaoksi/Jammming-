import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {term: ''};

    this.search = this.search.bind(this);
    this.handleTermCHange = this.handleTermCHange.bind(this);
  }

  //69
  search() {
    this.props.onSearch(this.state.term);
  }

  //71
  handleTermCHange(event) {
    this.setState({term: event.target.value});
  }


  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
        onChange={this.handleTermCHange}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
