import React from 'react';

const Search = ({location}) => {
    return (
        <div>
            {new URLSearchParams(location.search).get('keyword')} 서치
        </div>
    );
};

export default Search;