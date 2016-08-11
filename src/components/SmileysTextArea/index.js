import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'

export default class SmileysTextArea extends Component {


    constructor(props) {
        super(props)
        this.state = {
            bodyFocus: false
        }
    }

    addPostBodyOnFocus(e) {
        if (e.type == 'focus') this.setState({bodyFocus:true});
        //else this.setState({bodyFocus:false});

    }


    smileyOnClick(e) {
        let smileKey = e.target.getAttribute('data-smile');
        if (smileKey != null) {
            let val = this._body.value;
            let before = val.substring(0, this._body.selectionStart);
            let after = val.substring(this._body.selectionEnd, val.length);
            this._body.value = before + smileKey + after;
            this._body.selectionStart = before.length + smileKey.length;
            this._body.selectionEnd = this._body.selectionStart
        }
    }

    render() {
        return (
            <div>
            
            <textarea
                cols="70" rows="10"
                className={classNames('add_post_body', {expanded: this.state.bodyFocus || (this._body && this._body.value.length > 0)})}
                name="body"
                placeholder="Сообщение"
                defaultValue={this.props.defaultValue}
                ref={(c) => this._body = c}
                id="add_post_body"
                onFocus={this.addPostBodyOnFocus.bind(this)}

            
            />
                
                

            <div className="smileys" onClick={this.smileyOnClick.bind(this)}>
            <img src="/static/images/smileys/1.png" alt="" data-smile="(inlove)"/>
            <img src="/static/images/smileys/2.png" alt="" data-smile=":^)"/>
            <img src="/static/images/smileys/3.png" alt="" data-smile=":D"/>
            <img src="/static/images/smileys/4.png" alt="" data-smile="smile-4"/>
            <img src="/static/images/smileys/5.png" alt="" data-smile="smile-5"/>
            <img src="/static/images/smileys/6.png" alt="" data-smile="smile-6"/>
            <img src="/static/images/smileys/7.png" alt="" data-smile="smile-7"/>
            <img src="/static/images/smileys/8.png" alt="" data-smile="smile-8"/>
            <img src="/static/images/smileys/9.png" alt="" data-smile="smile-9"/>
            <img src="/static/images/smileys/10.png" alt="" data-smile="smile-10"/>
            <img src="/static/images/smileys/11.png" alt="" data-smile="smile-11"/>
            <img src="/static/images/smileys/12.png" alt="" data-smile="smile-12"/>
            <img src="/static/images/smileys/13.png" alt="" data-smile="smile-13"/>
            </div>
                
            </div>
        )


}
        }