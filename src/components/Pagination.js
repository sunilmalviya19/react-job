import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

class Epagination extends Component {

  onSelect = (page) => {
    if(this.props.handleSelect) {
      this.props.handleSelect(page);
    }
  }

  render() {
    const {totalPages, activePage} = this.props;
     // console.log(totalPages);
    let items = [];
    const minPage = Math.max(activePage - 2, 1);
    const maxPage = Math.min(activePage + 2, totalPages);

    for (let page = minPage; page <= maxPage; page++) {
      items.push(
        <Pagination.Item
          key={page} 
          active={page === activePage}
          onClick={() => this.onSelect(page)}>
            {page}
        </Pagination.Item>
      );
    }

    return (
      <Pagination>
        <Pagination.First disabled={activePage === 1} onClick={() => this.onSelect(1)} />
        <Pagination.Prev disabled={activePage === 1} onClick={() => this.onSelect(activePage-1)} />
        {activePage - 2 > 1 &&
          <Pagination.Ellipsis />
        }
        {items}
        {activePage + 2 < totalPages &&
          <Pagination.Ellipsis />
        }
        <Pagination.Next disabled={activePage === totalPages} onClick={() => this.onSelect(activePage+1)} />
        <Pagination.Last disabled={activePage === totalPages} onClick={() => this.onSelect(totalPages)} />
      </Pagination>
    )
  }
}

export default Epagination;