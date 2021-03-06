import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';


/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
    static propTypes = {
        assets: PropTypes.object,
        component: PropTypes.node,
        store: PropTypes.object
    };

    render() {
        const {component, store} = this.props;
        const content = component ? ReactDOM.renderToString(component) : '';
        const head = Helmet.rewind();
        const style = __DEVELOPMENT__ == false ? <link rel='stylesheet' type='text/css' href='/dist/bundle.css' /> : null;
        return (
            <html lang='en-us'>
            <head>
                

                <meta name='viewport' content='width=device-width, initial-scale=1' />
                {head.base.toComponent()}
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
                {head.script.toComponent()}

            <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700,700italic,400italic&subset=cyrillic,latin' rel='stylesheet' type='text/css'/>

                <link rel='shortcut icon' href='/static/images/favicon.ico' type='image/x-icon'/>

            </head>
            <body>


            {style}
            <script src='//yastatic.net/es5-shims/0.0.2/es5-shims.min.js'></script>
            <script src='//yastatic.net/share2/share.js'></script>
            <script src='https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js'></script>
            <script src='https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.11.2/lodash.min.js'></script>
            <script src='https://apis.google.com/js/platform.js'></script>

            <meta name='google-signin-client_id' content='652386564088-g829fhjk5jqdpuerod7qi2srp3tn42l4.apps.googleusercontent.com'/>

            <div><div id='app_root' dangerouslySetInnerHTML={{__html: content}}/></div>
            <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet='UTF-8'/>
            <script src='/dist/bundle.js' charSet='UTF-8'></script>
            <script src='/static/scripts.js' charSet='UTF-8'></script>
            </body>
            </html>
        );
    }
}
