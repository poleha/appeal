import React, { Component } from 'react'
import { Link } from 'react-router'


export default class NavLink extends Link {
    render (){
        let link = super.render();
        return (
          <li className={link.props.className}>
              {link}
        </li>
        )
    }
}