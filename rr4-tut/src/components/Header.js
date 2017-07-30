import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <NavLink className='item' exact to='/' activeClassName='active'>홈</NavLink>
            <NavLink className='item' to='/about/ddulh'>소개</NavLink>
            <NavLink className='item' to='/posts'>포스트</NavLink>
            <NavLink className='item' to='/me'>마이페이지</NavLink>
            <NavLink className='item' to='/login'>로그인</NavLink>
            <NavLink className='item' to='/search'>서치</NavLink>
        </div>
    );
};

export default Header;