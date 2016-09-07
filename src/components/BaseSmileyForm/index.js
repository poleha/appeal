import React, { PropTypes } from 'react'
import BaseComponent from '../../components/BaseComponent'
import classNames from 'classnames'
import config from '../../config'

export default class BaseSmileyForm extends BaseComponent {


    constructor(props) {
        super(props)
        this.state = {
            bodyFocus: false
        }
    }

    addPostBodyOnFocus(e) {
        if (e.type == 'focus' && !this.state.bodyFocus) this.setState({bodyFocus:true});
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

    getSmileys() {
        return config.smiley.map((smiley, i) => {
            return <img key={i} src={`/static/images/smileys/${smiley.filename}`} alt="" data-smile={smiley.data}/>
        })
    }

    getSmileyForm(defaultValue, hideSmileys) {

        let smileysBlock;
        if ( hideSmileys && !this.state.bodyFocus ) smileysBlock = null;
        else {
            smileysBlock = (
            <div className="smileys" onClick={this.smileyOnClick.bind(this)}>
                {this.getSmileys()}
            </div>
            )
        }

        return (
            <div>
            
            <textarea
                cols="70" rows="10"
                className={classNames('add_post_body', {expanded: this.state.bodyFocus || (this._body && this._body.value.length > 0)})}
                name="body"
                placeholder="Сообщение"
                defaultValue={defaultValue}
                ref={(c) => this._body = c}
                id="add_post_body"
                onFocus={this.addPostBodyOnFocus.bind(this)}
            />

                { smileysBlock }
                
            </div>
        )


}
        }