import React from 'react';
import logo from '../../images/logo.png';
import logoTitle from '../../images/logo-2.png';
import api from '../../utils/api'
import global from '../../utils/config'
import { createStore } from 'redux';
import './login.css';

import {browserHistory, Link} from 'react-router'

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

const store = createStore(counter);
store.subscribe(() => console.log(store.getState()))
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            capText: '',
            qrCode: ''
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submit = () => {
        browserHistory.push('/home');
    }

    handleChange =(event) => {
        this.setState({
            userName: event.target.value
        })
    }

    componentDidMount(){

        api.getQrcode().then(res => {
            this.setState({
                qrCode: global.imgRoot + res.img
            })
        })
    }

    render() {
        return (
          <div className="box">
              <div className="logos">
                  <img src={logo} height="45" alt="logo" />
              </div>
              <div className="login">
                  <div className="login-title">
                      <img src={logoTitle} height="45" alt="logo" />
                      <span>|</span>
                      <span>安全生产综合管理云平台</span>
                  </div>
                  <ul className="login-from">
                    <li className="li hover">
                        <label className="label username"></label>
                        <div className="text">
                            <input type="text" className="input" value={this.state.userName} onChange={this.handleChange} />
                        </div>
                    </li>
                    <li className="li-error"></li>
                    <li className="li hover">
                        <label className="label password"></label>
                        <div className="text">
                            <input type="password" className="input" value={this.state.passWord}/>
                        </div>
                    </li>
                    <li className="li-error"></li>
                    <li className="li li-border">
                        <div className="text" >
                            <input type="text" className="input input2 hover" placeholder="请输入验证码" maxLength="4" value={this.state.capText} />
                            <img src={this.state.qrCode} className="qr-code" alt="验证码" title="点击重新获取" />
                        </div>
                    </li>
                    <li className="li-error"></li>
                    <li className="li-2">
                        <input type="button" value="登录" className="submit" onClick={this.submit} />
                    </li>
                    <p className="li2-error" ></p>
                  </ul>
              </div>

              <p className="text-center help">
                  <span className="left">Copyright © 2018 北京迈道科技有限公司  京ICP备16026384号-1</span>
                  <span className="right">
                      <a href="http://www.imydao.com" target="_blank">关于迈道</a>
                      <a href="./dist/view/help.html?id=policy" target="_blank">免责声明</a>
                      <a href="./dist/view/help.html?id=privacy" target="_blank">隐私政策</a>
                      <a href="./dist/view/help.html?id=security" target="_blank">使用许可及服务协议</a>
                  </span>
              </p>
          </div>
        );
      }
}

export default Login;
